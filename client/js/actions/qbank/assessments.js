import wrapper from '../../constants/wrapper';

// Local actions
const actions = [
];

// Actions that make an api request
const requests = [
  'GET_ASSESSMENTS',
  'UPDATE_ASSESSMENT',
  'UPDATE_ASSESSMENT_ITEMS',
  'CREATE_ITEM_IN_ASSESSMENT',
  'CREATE_ASSESSMENT',
  'CREATE_ASSESSMENT_WITH_ITEM',
  'CREATE_ASSESSMENT_OFFERED',
  'GET_ASSESSMENT_OFFERED',
  'GET_ASSESSMENT_ITEMS',
  'DELETE_ASSESSMENT',
  'DELETE_ASSESSMENT_ITEM',
  'EDIT_OR_PUBLISH_ASSESSMENT',
  'DELETE_ASSIGNED_ASSESSMENT',
  'GET_ASSESSMENT_PREVIEW',
  'UPDATE_SINGLE_ITEM_OR_PAGE',
  'TOGGLE_PUBLISH_ASSESSMENT'
];

export const Constants = wrapper(actions, requests);

export function togglePublishAssessment(assessment) {
  return {
    assessment,
    type: Constants.TOGGLE_PUBLISH_ASSESSMENT,
    apiCall: true,
  };
}

export function getAssessmentPreview(bankId, assessmentId) {
  return {
    bankId,
    assessmentId,
    apiCall : true,
    type    : Constants.GET_ASSESSMENT_PREVIEW,
  };
}

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

export function createAssessmentWithItem(bankId, assessment, item) {
  return {
    bankId,
    assessment,
    item,
    apiCall : true,
    type    : Constants.CREATE_ASSESSMENT_WITH_ITEM,
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
    body    : { itemIds },
  };
}

export function createItemInAssessment(bankId, assessmentId, itemIds, newItem) {
  return {
    bankId,
    assessmentId,
    itemIds,
    apiCall : true,
    type    : Constants.CREATE_ITEM_IN_ASSESSMENT,
    body    : newItem,
  };
}

export function createAssessmentOffered(bankId, assessmentId) {
  return {
    bankId,
    assessmentId,
    body    : { dummyId: '123' }, // have to send up garbage data to make it work.
    apiCall : true,
    type    : Constants.CREATE_ASSESSMENT_OFFERED,
  };
}

export function getAssessmentItems(bankId, assessmentId) {
  return {
    bankId,
    assessmentId,
    apiCall : true,
    type    : Constants.GET_ASSESSMENT_ITEMS,
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

export function deleteAssignedAssessment(assessment, assignedId) {
  return {
    bankId       : assessment.bankId,
    assessmentId : assessment.id,
    assignedId,
    apiCall : true,
    type    : Constants.DELETE_ASSIGNED_ASSESSMENT,
  };
}

export function editOrPublishAssessment(assessment, editOrPublishId, isToggling = true) {
  return {
    bankId       : assessment.bankId,
    assessmentId : assessment.id,
    isToggling,
    apiCall      : true,
    type         : Constants.EDIT_OR_PUBLISH_ASSESSMENT,
    body         : { assignedBankIds: [editOrPublishId] }
  };
}

export function updateSingleItemOrPage(assessmentOffered, genusTypeId) {
  return {
    bankId: assessmentOffered.bankId,
    assessmentsOfferedId: assessmentOffered.id,
    apiCall      : true,
    type         : Constants.UPDATE_SINGLE_ITEM_OR_PAGE,
    body         : { genusTypeId }
  };
}
