import _                                    from 'lodash';
import Network                              from '../constants/network';
import request                              from './middleware_request';
import server                               from './server';
import api                                  from '../libs/api';
import authorAppHistory                     from '../_author/history';
import { DONE }                             from '../constants/wrapper';
import { Constants as BankConstants }       from '../actions/qbank/banks';
import { Constants as AssessmentConstants } from '../actions/qbank/assessments';
import { Constants as ItemConstants }       from '../actions/qbank/items';
import genusTypes                           from '../constants/genus_types';
import serialize                            from './serializers/qbank/serializer_factory';

function getAssessmentsOffered(state, bankId, assessmentId) {
  const path = `assessment/banks/${bankId}/assessments/${assessmentId}/assessmentsoffered`;

  return api.get(
    path,
    state.settings.api_url,
    state.jwt,
    state.settings.csrf_token,
  );
}

function getAssessmentsTaken(state, bankId, assessmentsOffered) {
  const basePath = `assessment/banks/${bankId}/assessmentsoffered/`;
  const assessmentsTaken = [];

  _.each(assessmentsOffered, (assessmentOffered) => {
    const offeredPath = `${assessmentOffered.id}/assessmentstaken`;
    assessmentsTaken.push(new Promise((resolve) => {
      api.get(
        basePath + offeredPath,
        state.settings.api_url,
        state.jwt,
        state.settings.csrf_token,
      ).then(res => resolve(res.body));
    }));
  });

  return Promise.all(assessmentsTaken);
}

function deleteAssessmentsTaken(state, bankId, assessmentsTaken) {
  const basePath = `assessment/banks/${bankId}/assessmentstaken/`;
  const deletedAssessmentsTaken = [];

  _.each(_.flatten(assessmentsTaken), (assessmentTaken) => {
    deletedAssessmentsTaken.push(new Promise((resolve) => {
      api.del(
        basePath + assessmentTaken.id,
        state.settings.api_url,
        state.jwt,
        state.settings.csrf_token,
      ).then(res => resolve(res.body));
    }));
  });

  return Promise.all(deletedAssessmentsTaken);
}

function deleteAssessmentsOffered(state, bankId, assessmentsOffered) {
  const basePath = `assessment/banks/${bankId}/assessmentsoffered/`;
  const deletedAssessmentsOffered = [];

  _.each(assessmentsOffered, (assessmentOffered) => {
    deletedAssessmentsOffered.push(new Promise((resolve) => {
      api.del(
        basePath + assessmentOffered.id,
        state.settings.api_url,
        state.jwt,
        state.settings.csrf_token,
      ).then(res => resolve(res.body));
    }));
  });

  return Promise.all(deletedAssessmentsOffered);
}

function createItemInAssessment(store, bankId, assessmentId, item, itemIds, action) {
  const state = store.getState();
  api.post(
    `assessment/banks/${bankId}/items`,
    state.settings.api_url,
    state.jwt,
    state.settings.csrf_token,
    null,
    item
  ).then((res) => {
    store.dispatch({
      type: ItemConstants.CREATE_ITEM + DONE,
      original: action,
      payload: res.body
    });

    const newId = res.body.id;

    return api.post(
      `assessment/banks/${bankId}/assessments/${assessmentId}/items`,
      state.settings.api_url,
      state.jwt,
      state.settings.csrf_token,
      null,
      { itemIds: itemIds.concat(newId) }
    );
  }).then((res2) => {
    store.dispatch({
      type: action.type + DONE,
      assessmentId,
      original: action,
      payload: res2.body
    });
  });
}

const qbank = {
  [BankConstants.GET_BANKS_HIERARCHY]: {
    method : Network.GET,
    url    : () => 'https://4h8n6sg95j.execute-api.us-east-1.amazonaws.com/dev/proxy',
  },

  [AssessmentConstants.GET_ASSESSMENTS]: {
    method : Network.GET,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments?isolated`,
  },

  [AssessmentConstants.CREATE_ASSESSMENT_OFFERED]: {
    method : Network.POST,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assessmentsoffered`,
  },

  [AssessmentConstants.GET_ASSESSMENT_OFFERED]: {
    method : Network.GET,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assessmentsoffered`,
  },

  [AssessmentConstants.GET_ASSESSMENT_ITEMS]: {
    method : Network.GET,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/items?wronganswers`,
  },

  [AssessmentConstants.EDIT_OR_PUBLISH_ASSESSMENT]: {
    method : Network.POST,
    url    : action => `https://qbank-clix-dev.mit.edu//api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assignedbankids`,
  },

  [AssessmentConstants.DELETE_ASSIGNED_ASSESSMENT]: {
    method : Network.DEL,
    url    : action => `https://qbank-clix-dev.mit.edu//api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assignedbankids/${action.assignedId}`,
  },

  [AssessmentConstants.UPDATE_ASSESSMENT]: {
    method : Network.PUT,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments/${action.body.id}`,
  },

  [AssessmentConstants.UPDATE_SINGLE_ITEM_OR_PAGE]: {
    method : Network.PUT,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessmentsoffered/${action.assessmentsOfferedId}`,
  },

  [AssessmentConstants.UPDATE_ASSESSMENT_ITEMS]: {
    method : Network.PUT,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/items`,
  },

  [AssessmentConstants.DELETE_ASSESSMENT_ITEM]: {
    method : Network.DEL,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/items/${action.itemId}`,
  },

  [ItemConstants.GET_ITEMS]: {
    method : Network.GET,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/items`,
  },

  [ItemConstants.CREATE_ITEM]: {
    method : Network.POST,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/items`,
  },

  [ItemConstants.UPDATE_ITEM]: (store, action) => {
    const item = store.getState().items[action.bankId][action.itemId];
    const updatedAttributes = action.body;

    const newItem = serialize(updatedAttributes.type || item.type)(item, updatedAttributes);

    request(
      store,
      action,
      Network.PUT,
      `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/items/${action.itemId}`,
      action.params,
      newItem
    );
  },

  [AssessmentConstants.CREATE_ITEM_IN_ASSESSMENT]: (store, action) => {
    createItemInAssessment(
      store,
      action.bankId,
      action.assessmentId,
      action.body,
      action.itemIds,
      action
    );
  },

  [AssessmentConstants.CREATE_ASSESSMENT]: (store, action) => {
    const state = store.getState();

    api.post(
      `assessment/banks/${action.bankId}/assessments`,
      state.settings.api_url,
      state.jwt,
      state.settings.csrf_token,
      null,
      action.body
    ).then((res) => {
      // Redirect to the edit view for the assessment, as it exists now
      authorAppHistory.push(`banks/${action.bankId}/assessments/${res.body.id}`);
      store.dispatch({
        type: action.type + DONE,
        original: action,
        payload: res.body
      });
    });
  },

  [AssessmentConstants.CREATE_ASSESSMENT_WITH_ITEM]: (store, action) => {
    const state = store.getState();

    api.post(
      `assessment/banks/${action.bankId}/assessments?genusTypeId=assessment-bank-genus%3Aeditable%40ODL.MIT.EDU`,
      state.settings.api_url,
      state.jwt,
      state.settings.csrf_token,
      null,
      action.assessment
    ).then((res) => {
      // Redirect to the edit view for the assessment, as it exists now
      authorAppHistory.push(`banks/${action.bankId}/assessments/${res.body.id}`);

      store.dispatch({
        type: AssessmentConstants.CREATE_ASSESSMENT + DONE,
        original: action,
        payload: res.body
      });

      createItemInAssessment(
        store,
        action.bankId,
        decodeURIComponent(res.body.id),
        action.item,
        [],
        action
      );
    });
  },

  [AssessmentConstants.DELETE_ASSESSMENT]: (store, action) => {
    const state = store.getState();
    const { bankId, assessmentId } = action;
    getAssessmentsOffered(state, bankId, assessmentId).then((res) => {
      const assessmentsOffered = res.body;

      getAssessmentsTaken(state, bankId, assessmentsOffered)
      .then(assessmentsTaken => deleteAssessmentsTaken(
        state,
        bankId,
        assessmentsTaken
      ))
      .then(() => deleteAssessmentsOffered(state, bankId, assessmentsOffered))
      .then(() => api.del(
        `assessment/banks/${bankId}/assessments/${assessmentId}`,
        state.settings.api_url,
        state.jwt,
        state.settings.csrf_token
      ))
      .then(() => store.dispatch({
        type     : action.type + DONE,
        original : action,
      }));
    });
  },
};

export default { ...server, ...qbank };
