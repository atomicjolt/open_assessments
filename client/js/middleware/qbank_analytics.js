import Immutable                                    from "immutable";

import { Constants as MediaAnalyticsConstants }     from "../actions/media_analytics";
import { Constants as AssessmentProgressConstants } from "../actions/assessment_progress";
import { postQbank }                                from "./qbank";
import { transformItem }                            from "../parsers/clix/clix";

function postAnalytics(store, analyticsData) {
  const state = store.getState();

  const url = `logging/logs/${state.settings.bank}/logentries`;

  const currentQuestionIndex = state.assessmentProgress.get("currentItemIndex");
  const questionId = state.assessment.items[currentQuestionIndex].json.id;

  let body = {
    data: {
      assessmentOfferedId: state.settings.assessment_offered_id,
      questionId,
      ...analyticsData
    }
  };

  postQbank(state, url, body);
}

function getAnswerSelectedData(store, action) {
  const state = store.getState();
  const question = transformItem(state.assessment.items[action.questionIndex]);
  const answersById = {};
  _.each(question.answers, (answer) => {
    answersById[answer.id] = answer;
  });

  let currentAnswers = state.assessmentProgress.getIn(['responses', `${action.questionIndex}`]);
  currentAnswers = currentAnswers || Immutable.List();

  switch(question.question_type) {
    case "movable_words_sentence":
    case "movable_words_sandbox":
      if(currentAnswers.includes(action.answerId)) {
        return {
          action: "disconnect word",
          targetWord: answersById[action.answerId].material,
          currentSentence: currentAnswers.map((answerId) => (answersById[answerId].material))
        };
      } else {
        return {
          action: "connect word",
          targetWord: answersById[action.answerId].material,
          currentSentence: currentAnswers.map((answerId) => (answersById[answerId].material))
        };
      }
      break;

    case "movable_object_chain":
      if(currentAnswers.includes(action.answerId)) {
        return {
          action: "disconnect object",
          targetObject: answersById[action.answerId].material,
          currentObjectChain: currentAnswers.map((answerId) => (answersById[answerId].material))
        };
      } else {
        return {
          action: "connect object",
          targetObject: answersById[action.answerId].material,
          currentObjectChain: currentAnswers.map((answerId) => (answersById[answerId].material))
        };
      }
      break;

    case "fill_the_blank_question":
      if(_.isEmpty(currentAnswers)) {
        return {
          action: "connect word",
          targetWord: answersById[action.answerId].material
        };
      } else {
        return {
          action: "disconnect word",
          targetWord: answersById[action.answerId].material
        };
      }
      break;

    case "multiple_choice_question":
      return {
        action: "select answer",
        targetAnswer: answersById[action.answerId].material
      };
      break;

    case "multiple_answers_question":
      if(currentAnswers.includes(action.answerId)) {
        return {
          action: "deselect answer",
          targetAnswer: answersById[action.answerId].material,
          currentAnswers: currentAnswers.map((answerId) => (answersById[answerId].material))
        };
      } else {
        return {
          action: "select answer",
          targetAnswer: answersById[action.answerId].material,
          currentAnswers: currentAnswers.map((answerId) => (answersById[answerId].material))
        };
      }
      break;
  }
}

export default {
  [AssessmentProgressConstants.ASSESSMENT_NEXT_QUESTIONS] : (store, action) => {
    const analyticsData = {
      action: "click next button"
    };

    postAnalytics(store, analyticsData);
  },

  [AssessmentProgressConstants.ASSESSMENT_PREVIOUS_QUESTIONS] : (store, action) => {
    const state = store.getState();

    if(state.assessment.requireNAnswers !== -1) {
      const analyticsData = {
        action: "click previous button"
      };

      postAnalytics(store, analyticsData);
    }
  },

  [AssessmentProgressConstants.ANSWER_SELECTED] : (store, action) => {
    const analyticsData = getAnswerSelectedData(store, action);
    if(analyticsData !== undefined) {
      postAnalytics(store, analyticsData);
    }
  },

  [MediaAnalyticsConstants.AUDIO_PLAY] : (store, action) => {
    const data = {
      action: "play audio",
      mediaTime: action.mediaTime,
      mediaId: action.mediaId
    };

    postAnalytics(store, data);
  },

  [MediaAnalyticsConstants.AUDIO_PAUSE] : (store, action) => {
    const data = {
      action: "pause audio",
      mediaTime: action.mediaTime,
      mediaId: action.mediaId
    };

    postAnalytics(store, data);
  },

  [MediaAnalyticsConstants.AUDIO_RECORD_STOP] : (store, action) => {
    const data = {
      action: "record audio stop",
      mediaTime: action.mediaTime
    };

    postAnalytics(store, data);
  },

  [MediaAnalyticsConstants.VIDEO_PLAY] : (store, action) => {
    const data = {
      action: "play video",
      mediaTime: action.mediaTime,
      mediaId: action.mediaId
    };

    postAnalytics(store, data);
  },

  [MediaAnalyticsConstants.VIDEO_PAUSE] : (store, action) => {
    const data = {
      action: "pause video",
      mediaTime: action.mediaTime,
      mediaId: action.mediaId
    };

    postAnalytics(store, data);
  },
};
