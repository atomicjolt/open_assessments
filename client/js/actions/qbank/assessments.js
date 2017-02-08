import wrapper from '../../constants/wrapper';

// Local actions
const actions = [
];

// Actions that make an api request
const requests = [
  'GET_ASSESSMENTS',
  'CREATE_ASSESSMENT',
  'CREATE_ASSESSMENT_OFFERED',
  'GET_ASSESSMENT_OFFERED',
  'DELETE_ASSESSMENT',
  'PUBLISH_ASSESSMENT',
];

export const Constants = wrapper(actions, requests);

export function getAssessments(bankId) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.GET_ASSESSMENTS,
  };
}

export function createAssessment(bankId, assessment) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.CREATE_ASSESSMENT,
    body    : assessment,
  };
}

export function createAssessmentOffered(bankId, assessmentId) {
  return {
    bankId,
    assessmentId,
    apiCall : true,
    type    : Constants.CREATE_ASSESSMENT_OFFERED,
  };
}

export function getAssessmentOffered(bankId, assessmentId) {
  return {
    bankId,
    assessmentId,
    apiCall : true,
    type    : Constants.GET_ASSESSMENT_OFFERED,
  };
}

export function deleteAssessment(bankId, assessmentId) {
  return {
    bankId,
    assessmentId,
    apiCall : true,
    type    : Constants.DELETE_ASSESSMENT,
  };
}


export function publishAssessment(bankId, assessmentId) {
  return {
    bankId,
    assessmentId,
    apiCall : true,
    type    : Constants.PUBLISH_ASSESSMENT,
  };
}

