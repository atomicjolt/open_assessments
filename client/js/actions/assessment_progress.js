import wrapper from '../constants/wrapper';

const constants = [
  "ASSESSMENT_START",
  "ANSWER_SELECTED",
  "QUESTION_SELECTED",
  "ASSESSMENT_CHECK_ANSWER",
  "LEVEL_SELECTED",
  "ASSESSMENT_NEXT_QUESTION",
  "ASSESSMENT_PREVIOUS_QUESTION",
  "RETAKE_ASSESSMENT",
  "ASSESSMENT_VIEWED"
];

const requests = ["ASSESSMENT_SUBMITTED"];

export const Constants = wrapper(constants, requests);

export const start = (assessmentId) => ({
  type: Constants.ASSESSMENT_START,
  assessmentId
});

export const answerSelected = (item) => ({
  type: Constants.ANSWER_SELECTED,
  item
});

export const selectQuestion = (index) => ({
  type: Constants.QUESTION_SELECTED, index
});

export const checkAnswer = () => ({
  type: Constants.ASSESSMENT_CHECK_ANSWER
});

export const selectConfidenceLevel = (level, index) => ({
  type: Constants.LEVEL_SELECTED,
  level,
  index
});

export const submitAssessment = (body) => ({
  type:Constants.ASSESSMENT_GRADED,
  body
});

// TODO refactor logic to component
// (identifier, assessmentId, questions, studentAnswers, settings, outcomes){
//     Dispatcher.dispatch({action: Constants.ASSESSMENT_SUBMITTED});
//     // Only send data needed for server-side grading.
//     questions = questions.map(function(q){
//       return {
//         id: q.id,
//         score: q.score,
//         confidenceLevel: q.confidenceLevel,
//         timeSpent: q.timeSpent,
//         startTime: q.startTime,
//         outcome_guid: q.outcome_guid
//       }
//     });
//     settings = {
//       externalUserId: settings.externalUserId,
//       externalContextId: settings.externalContextId,
//       userAssessmentId: settings.userAssessmentId,
//       ltiLaunchId: settings.ltiLaunchId,
//       userAttempts: settings.userAttempts,
//       srcUrl: settings.srcUrl,
//       lisResultSourceDid: settings.lisResultSourceDid,
//       lisOutcomeServiceUrl: settings.lisOutcomeServiceUrl,
//       lisUserId: settings.lisUserId,
//       isLti: settings.isLti,
//       ltiRole: settings.ltiRole,
//       assessmentKind: settings.assessmentKind,
//       accountId: settings.accountId
//     };
//     var body = {
//       itemToGrade: {
//         questions    : questions,
//         answers      : studentAnswers,
//         assessmentId : assessmentId,
//         identifier   : identifier,
//         settings     : settings
//       }
//     };
//     Api.post(Constants.ASSESSMENT_GRADED,'api/grades', body);
//   }

export const nextQuestion = () => ({
  type: Constants.ASSESSMENT_NEXT_QUESTION
});

export const previousQuestion = () => ({
  type: Constants.ASSESSMENT_PREVIOUS_QUESTION
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
//         assessment_id    : settings.assessmentId,
//         identifier       : assessment.id,
//         eId              : settings.eId,
//         external_user_id : settings.externalUserId,
//         external_context_id : settings.externalContextId,
//         resultsEndPoint  : settings.resultsEndPoint,
//         keywords         : settings.keywords,
//         objectives       : assessment.objectives,
//         src_url          : settings.srcUrl
//       }
//     };
//     Api.post(Constants.ASSESSMENT_VIEWED, '/api/assessment_results', body);
//   }



export const itemViewed = (body) => ({
  type: Constants.ASSESSMENT_VIEWED, //Two actions have the same type?
  body
});

// { TODO add functionality in component
//     var body = {
//       item_result : {
//         offline              : settings.offline,
//         assessment_result_id : assessment_result.id,
//         assessment_id        : settings.assessmentId,
//         identifier           : assessment.id,
//         eId                  : settings.eId,
//         external_user_id     : settings.externalUserId,
//         resultsEndPoint      : settings.resultsEndPoint,
//         keywords             : settings.keywords,
//         objectives           : assessment.objectives,
//         src_url              : settings.srcUrl
//       }
//     };
//     Api.post(Constants.ASSESSMENT_VIEWED, '/api/item_results', body);
//   }
