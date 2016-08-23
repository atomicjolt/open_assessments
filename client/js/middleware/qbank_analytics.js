import { Constants as MediaAnalyticsConstants }     from "../actions/media_analytics";
import { Constants as AssessmentProgressConstants } from "../actions/assessment_progress";
import { postQbank }                                from "./qbank";
import { transformItem }                            from "../parsers/clix/clix";

function postAnalytics(store, analyticsData) {
  const state = store.getState();

  const logId = state.settings.bank.replace(/^assessment\.Bank/, "logging.Log");
  const url = `logging/logs/${logId}/logentries`;

  const currentQuestionIndex = state.assessmentProgress.get("currentItemIndex");
  const questionId = state.assessment.items[currentQuestionIndex].json.id;

  let body = {
    assessmentOfferedId: state.settings.assessmentOfferedId,
    questionId,
    ...analyticsData
  };

  // postQbank(state, url, body);
}

function getAnswerSelectedData(store, action) {
  const state = store.getState();
  const question = transformItem(state.assessment.items[action.questionIndex]);
  const answersById = {};
  _.each(question.answers, (answer) => {
    answersById[answer.id] = answer;
  });

  const currentAnswers = state.assessmentProgress.getIn(['responses', `${action.questionIndex}`]);

  debugger;
  switch(question.question_type) {
    case "movable_words_sentence":
    case "movable_words_sandbox":
    case "movable_object_chain":
      if(!currentAnswers.includes(action.answerId)) {
        return {
          action: "connect word",
          currentSentence: currentAnswers.map((answerId) => answersById[answerId].text)
        };
      }
      break;
  }
  if(action.exclusive || !currentAnswers.includes(action.answerId)) {
    return "select answer";
  } else {
    return "deselect answer";
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
    const analyticsAction = getAnswerSelectedAction(store, action);

    const analyticsData = {
      action: "click next button"
    };

    postAnalytics(store, analyticsData);
  },

  [MediaAnalyticsConstants.AUDIO_PLAY] : (store, action) => {
    let body = {
      action: "play audio",
      mediaTime: action.mediaTime,
      mediaId: action.mediaId
    };

    postAnalytics(store, body);
  },

  [MediaAnalyticsConstants.AUDIO_STOP] : (store, action) => {
    let body = {
      action: "stop audio",
      mediaTime: action.mediaTime,
      mediaId: action.mediaId
    };

    postAnalytics(store, body);
  },

  [MediaAnalyticsConstants.AUDIO_RECORD_STOP] : (store, action) => {
    let body = {
      action: "record audio",
    };

    postAnalytics(store, body);
  },

  [MediaAnalyticsConstants.VIDEO_PLAY] : (store, action) => {
    let body = {
      action: "play video",
      mediaTime: action.mediaTime,
      mediaId: action.mediaId
    };

    postAnalytics(store, body);
  },

  [MediaAnalyticsConstants.VIDEO_STOP] : (store, action) => {
    let body = {
      action: "record audio",
      mediaTime: action.mediaTime,
      mediaId: action.mediaId
    };

    postAnalytics(store, body);
  }
};
