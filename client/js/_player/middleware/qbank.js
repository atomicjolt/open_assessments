import Immutable                                    from "immutable";
import api                                          from "../libs/api";
import Network                                      from "../constants/network";
import { Constants as JwtConstants }                from "../actions/jwt";
import { Constants as AssessmentConstants }         from "../actions/assessment";
import { Constants as AssessmentProgressConstants } from "../actions/assessment_progress";
import { Constants as AssessmentMetaConstants }     from "../actions/assessment_meta.js";
import { Constants as LocaleConstants }             from "../actions/locale";
import { answerFeedback }                           from "../actions/assessment_progress";
import { DONE }                                     from "../constants/wrapper";
import { parseFeedback }                            from "../parsers/clix/parser";
import { parse }                                    from "../parsers/assessment";
import { transformItem }                            from "../parsers/clix/clix";
import { displayError }                             from "../actions/application";
import { localizeStrings }                          from "../selectors/localize";

/**
 * Determines whether or not a question has been answered or not based on the input
 */
function isAnswered(userInput) {
  return userInput.some((item) => !_.isEmpty(item) || item instanceof Blob);
}

function defaultHeaders(state, action = {}) {
  return {
    "X-Api-Proxy": state.settings.eid,
    "X-API-LOCALE": action.locale || state.locale || state.settings.locale
  };
}

/**
 * Returns unanswered question feedback for an unanswered question based upon its
 * question type
 */
function getFeedback(question, state){
  var item = transformItem(question);
  const localizedStrings = localizeStrings(state);

  switch(item.question_type) {
    case "text_input_question":
    case "text_only_question":
    case "short_answer_question":
    case "survey_question":
    case "numerical_input_question":
      return localizedStrings.middleware.mustEnterAnswer;

    case "file_upload_question":
      return localizedStrings.middleware.mustUploadFile;

    case "audio_upload_question":
      return localizedStrings.middleware.mustRecordFile;

    default:
      return localizedStrings.middleware.mustSelectAnswer;
  }
}

function getBody(userInput, question){
  var type = question.json.genusTypeId;
  if(type && type.startsWith("question")) {
    type = type.replace("question", "answer");
  } else {
    console.error("Couldn't get the question type");
  }

  var item = transformItem(question);

  switch (item.question_type) {
    case "short_answer_question":
      var text = _.isEmpty(userInput)? "" : userInput.reduce((prev, current) => prev + current );
      return {
        type,
        text
      };
      break;

    case "fill_the_blank_question":
      return {
        type,
        inlineRegions: {
          [item.question_meta.responseIdentifier]: {
            choiceIds: userInput
          }
        }
      };
      break;
    case "numerical_input_question":
    case "text_input_question":
      return {
        type,
        [item.question_meta.responseIdentifier]: userInput[0] || ""
      };
      break;

    case "file_upload_question":
    case "audio_upload_question":
      if(_.isEmpty(userInput)){return;}

      var formData = new FormData();
      formData.append('submission', userInput[0]);
      if(userInput.length > 1){console.error('Only one form submission is supported!');}
      return formData;

      break;

    case "movable_words_sandbox":
      const audioFiles = userInput.filter((item) => { return item instanceof Blob; });
      var formData = new FormData();
      formData.append('submission', _.last(audioFiles));
      return formData;

      break;

    default:
      return {
        type,
        choiceIds: userInput,
      };
  }
}

/**
 * Sends a post request to qbank with qbank specific fields already set.
 */
export function postQbank(state, url, body = {}, headers = {}, params={}){
  return api.post(
    url,
    state.settings.api_url,
    state.jwt,
    state.settings.csrf_token,
    params,
    body,
    _.merge(defaultHeaders(state), headers)
  );
};

function checkAnswers(store, action) {
  const state = store.getState();
  const currentItemIndex = state.assessmentProgress.get("currentItemIndex");
  const questionIndexes = _.range(currentItemIndex, currentItemIndex + state.settings.questions_per_page);

  return _.map(questionIndexes, (questionIndex) => {
    const question = state.assessment.items[questionIndex];
    // If an Immutable list index is set to undefined (as opposed to not being
    // assigned anything), then the getIn() will still return undefined instead
    //  of the default return value. We need to see if it
    // is actually undefined before calling toJS()
    var userInput = state.assessmentProgress.getIn(["responses", `${questionIndex}`]);
    userInput = userInput ? userInput.toJS() : [];

    const url = `assessment/banks/${state.settings.bank}/assessmentstaken/${state.assessmentMeta.id}/questions/${question.json.id}/submit`;
    var body = getBody(userInput, question);

    // Let progress reducer know how many questions are being checked
    store.dispatch({
      type: AssessmentProgressConstants.CHECK_QUESTIONS,
      numQuestions: questionIndexes.length
    });

    // If the user answered hasn't given an answer yet, we need to display
    // feedback telling the user to do so, and not send any information to qbank.
    if(!isAnswered(userInput)){

      const payload = {
        feedback: `<p>${getFeedback(question, state)}</p>`,
        correct: false,
        userInput
      };
      store.dispatch({
        type: AssessmentProgressConstants.ASSESSMENT_CHECK_ANSWER_DONE,
        payload,
        userInput,
        questionIndex,
        original: action
      });

      return;
    }

    const promise = postQbank(state, url, body);
    if(promise){
      promise.then((response) => {
        const payload = {
          correct  : response.body.correct,
          feedback : parseFeedback(response.body.feedback),
          userInput
        };

        store.dispatch({
          type: AssessmentProgressConstants.ASSESSMENT_CHECK_ANSWER_DONE,
          payload,
          questionIndex,
          userInput,
          original: action,
          response
        });
      },
      (error) => {
        store.dispatch({
          type: AssessmentProgressConstants.ASSESSMENT_CHECK_ANSWER_DONE,
          error
        });
        console.error(error);
      });

      return promise;
    }

  });
}

function loadQuestions(store, action) {
  const state = store.getState();
  const assessmentUrl = `assessment/banks/${state.settings.bank}/assessmentstaken/${state.assessmentMeta.id}/questions?qti`;
  const assessmentPromise = api.get(
    assessmentUrl,
    state.settings.api_url,
    state.jwt,
    state.settings.csrf_token,
    {},
    defaultHeaders(state, action)
  );
  
  if(assessmentPromise) {
    assessmentPromise.then((assessmentResponse, error) => {
      store.dispatch({
        type:     AssessmentConstants.LOAD_ASSESSMENT + DONE,
        payload:  parse(state.settings, assessmentResponse.text),
        original: action,
        assessmentResponse,
        error
      });
    },
    (error) => {
      store.dispatch(displayError("There was a problem getting the assessment from QBank", error));
    });
  }
}

export default {

  [LocaleConstants.LOCALE_SET]: (store, action) => {
    const state = store.getState();
    if(_.isEmpty(state.assessmentMeta)) { return; }
    loadQuestions(store, action);
  },
  [JwtConstants.REFRESH_JWT]: {
    method : Network.GET,
    url    : (action) => ( `api/sessions/${action.userId}` )
  },

  [AssessmentConstants.LOAD_ASSESSMENT]: (store, action) => {
    const state = store.getState();

    const metaUrl = `assessment/banks/${state.settings.bank}/assessmentsoffered/${state.settings.assessment_offered_id}/assessmentstaken`;

    const body = {
      sessionId: state.settings.eid
    };

    const metaPromise = postQbank(state, metaUrl, body);

    if(metaPromise){
      metaPromise.then((response, error) => {
        store.dispatch({
          type:     AssessmentMetaConstants.LOAD_ASSESSMENT_META_DONE,
          payload:  response.body,
          original: action,
          response,
          error
        });
        loadQuestions(store, action);
      },
      (error) => {
        store.dispatch(displayError("There was a problem creating the assessmentstaken in QBank", error));
      });
    }
  },

  [AssessmentProgressConstants.ASSESSMENT_CHECK_ANSWER]: (store, action) => {
    checkAnswers(store, action);
  },

  [AssessmentProgressConstants.ASSESSMENT_NEXT_QUESTIONS]: (store, action) => {
    const state = store.getState();
    if(state.settings.unlock_next == "ALWAYS") {
      checkAnswers(store, action);
    }
  },

  [AssessmentProgressConstants.ASSESSMENT_PREVIOUS_QUESTIONS]: (store, action) => {

  },

  [AssessmentProgressConstants.ANSWER_SELECTED]: (store, action) => {

  },

  [AssessmentProgressConstants.ASSESSMENT_GRADED]: {
    method : Network.POST,
    url    : (action) => { 'api/grades'; },
    body   : (action) => {

      // Only send data needed for server-side grading.
      const questions = action.questions.map(function(question){
        return {
          id               : question.id,
          score            : question.score,
          confidence_level : question.confidenceLevel,
          time_spent       : question.timeSpent,
          start_time       : question.startTime,
          outcome_guid     : question.outcomeGuid
        };
      });

      return {
        item_to_grade : {
          assessment_id : action.assessmentId,
          questions,
          answers       : action.answers,
          identifier    : action.identifier,
          settings      : action.settings
        }
      };

    }
  },

  [AssessmentProgressConstants.ASSESSMENT_SUBMITTED]: (store, action) => {
    Promise.all(checkAnswers(store, action)).then(() => {
      const state = store.getState();

      const url = `assessment/banks/${state.settings.bank}/assessmentstaken/${state.assessmentMeta.id}/finish`;

      const promise = postQbank(state, url);

      if(promise){
        promise.then((response, error) => {
          store.dispatch({
            type:     action.type + DONE,
            payload: response.body,
            original: action,
            response,
            error
          });
        });
      }
    });
  }
};