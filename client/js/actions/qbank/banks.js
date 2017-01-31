import wrapper from '../../constants/wrapper';

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  'GET_BANKS',
  'GET_ASSESSMENTS',
  'GET_ITEMS',
  'GET_BANK_SUB_BANKS',
  'CREATE_ASSESSMENT',
  'DELETE_ASSESSMENT',
  'PUBLISH_ASSESSMENT',
];

export const Constants = wrapper(actions, requests);

export function getBanks() {
  return {
    apiCall : true,
    type    : Constants.GET_BANKS,
  };
}

export function getBankAssessments(bankId) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.GET_ASSESSMENTS,
  };
}

export function getBankItems(bankId) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.GET_ITEMS,
  };
}

export function getBankSubBanks(bankId) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.GET_BANK_SUB_BANKS,
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
