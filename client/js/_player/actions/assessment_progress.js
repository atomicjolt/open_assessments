import wrapper from '../../constants/wrapper';

const constants = [
  'ASSESSMENT_START',
  'QUESTION_SELECTED',
  'LEVEL_SELECTED',
  'RETAKE_ASSESSMENT',
  'ASSESSMENT_VIEWED',
  'CHECK_QUESTIONS'
];

const requests = [
  'ASSESSMENT_SUBMITTED',
  'ANSWER_SELECTED',
  'ASSESSMENT_CHECK_ANSWER',
  'ASSESSMENT_NEXT_QUESTIONS',
  'ASSESSMENT_PREVIOUS_QUESTIONS'
];

export const Constants = wrapper(constants, requests);

export const start = (assessmentId) => ({
  type: Constants.ASSESSMENT_START,
  assessmentId
});

// normally answerData will just be the id. However, for drag and drop we need
// more than that.
export const answerSelected = (questionIndex, answerData, exclusive) => ({
  type: Constants.ANSWER_SELECTED,
  questionIndex,
  answerData,
  exclusive
});

export const selectQuestion = index => ({
  type: Constants.QUESTION_SELECTED, index
});

export const checkAnswer = questionIndexes => ({
  type    : Constants.ASSESSMENT_CHECK_ANSWER,
  questionIndexes,
  apiCall : true
});

export const selectConfidenceLevel = (level, index) => ({
  type: Constants.LEVEL_SELECTED,
  level,
  index
});

export const submitAssessment = (
  identifier,
  assessmentId,
  questions,
  answers,
  settings,
  outcomes) => ({
    type    : Constants.ASSESSMENT_SUBMITTED,
    identifier,
    assessmentId,
    questions,
    answers,
    settings,
    outcomes,
    apiCall : true
  });

export const nextQuestions = (pageSize = 1) => ({
  type    : Constants.ASSESSMENT_NEXT_QUESTIONS,
  pageSize,
  apiCall : true
});

export const previousQuestions = (pageSize = 1) => ({
  type    : Constants.ASSESSMENT_PREVIOUS_QUESTIONS,
  pageSize,
  apiCall : true
});

export const retakeAssessment = () => ({
  type: Constants.RETAKE_ASSESSMENT
});

export const assessmentViewed = (settings, assessment) => ({
  type: Constants.ASSESSMENT_VIEWED,
  settings,
  assessment
});

// { TODO andd functionality to component
//     var body = {
//       assessment_result : {
//         offline          : settings.offline,
//         assessment_id    : settings.assessment_id,
//         identifier       : assessment.id,
//         eId              : settings.eId,
//         keywords         : settings.keywords,
//         objectives       : assessment.objectives,
//         src_url          : settings.src_url,
//         lti              : settings.lti
//       }
//     };
//     Api.post(Constants.ASSESSMENT_VIEWED, '/api/assessment_results', body);
//   }

export const itemViewed = body => ({
  type: Constants.ASSESSMENT_VIEWED, // Two actions have the same type?
  body
});

// { TODO add functionality in component
//     var body = {
//       item_result : {
//         offline              : settings.offline,
//         assessment_result_id : assessment_result.id,
//         assessment_id        : settings.assessment_id,
//         identifier           : assessment.id,
//         eId                  : settings.eId,
//         external_user_id     : settings.external_user_id,
//         resultsEndPoint      : settings.resultsEndPoint,
//         keywords             : settings.keywords,
//         objectives           : assessment.objectives,
//         src_url              : settings.src_url
//       }
//     };
//     Api.post(Constants.ASSESSMENT_VIEWED, '/api/item_results', body);
//   }
