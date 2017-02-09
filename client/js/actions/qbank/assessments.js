import wrapper from '../../constants/wrapper';

// Local actions
const actions = [
];

// Actions that make an api request
const requests = [
  'GET_ASSESSMENTS',
  'UPDATE_ASSESSMENT',
  'UPDATE_ASSESSMENT_ITEMS',
  'CREATE_ASSESSMENT',
  'CREATE_ASSESSMENT_OFFERED',
  'GET_ASSESSMENT_OFFERED',
  'DELETE_ASSESSMENT',
  'DELETE_ASSESSMENT_ITEM',
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

export function updateAssessment(bankId, assessment) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.UPDATE_ASSESSMENT,
    body    : assessment,
  };
}

export function updateAssessmentItems(bankId, assessmentId, itemIds) {
  return {
    bankId,
    assessmentId,
    apiCall : true,
    type    : Constants.UPDATE_ASSESSMENT_ITEMS,
    body    : itemIds,
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

export function deleteAssessmentItem(bankId, assessmentId, itemId) {
  return {
    bankId,
    assessmentId,
    itemId,
    apiCall : true,
    type    : Constants.DELETE_ASSESSMENT_ITEM,
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
