import _                                    from 'lodash';
import Network                              from '../constants/network';
import server                               from './server';
import api                                  from '../libs/api';
import authorAppHistory                     from '../_author/history';
import { DONE }                             from '../constants/wrapper';
import { Constants as BankConstants }       from '../actions/qbank/banks';
import { Constants as AssessmentConstants } from '../actions/qbank/assessments';
import { Constants as ItemConstants }       from '../actions/qbank/items';
import { Constants as AssetConstants }      from '../actions/qbank/assets';
import serialize                            from './serialization/qbank/serializers/factory';
import deserialize                          from './serialization/qbank/deserializers/factory';
import { scrub }                            from './serialization/serializer_utils';
import * as assessmentActions               from '../actions/qbank/assessments';

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

// takingAgentId is used to delete all assessmentsTaken for a specific user. It
// should be in the format `osid.agent.Agent%3A${user_id}%40MIT-ODL`.
// In the player it is set in qbank using the x-api-proxy header, which is set
// via the eid setting.
function deleteAssessmentsTaken(state, bankId, assessmentsTaken, takingAgentId = '') {
  const basePath = `assessment/banks/${bankId}/assessmentstaken/`;
  const deletedAssessmentsTaken = [];

  _.each(_.flatten(assessmentsTaken), (assessmentTaken) => {
    if (!takingAgentId || assessmentTaken.takingAgentId === takingAgentId) {
      deletedAssessmentsTaken.push(new Promise((resolve) => {
        api.del(
          basePath + assessmentTaken.id,
          state.settings.api_url,
          state.jwt,
          state.settings.csrf_token,
        ).then(res => resolve(res.body));
      }));
    }
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
    scrub(serialize(item.type)({ question: {} }, item))
  ).then((res) => {
    store.dispatch({
      type: ItemConstants.CREATE_ITEM + DONE,
      original: action,
      payload: deserialize(res.body.genusTypeId)(res.body)
    });

    const newId = res.body.id;
    store.dispatch({
      type: AssessmentConstants.CREATE_ITEM_IN_ASSESSMENT,
      original: action,
      newItemId: newId,
    });

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

  [BankConstants.GET_BANKS_HIERARCHY]: (store, action) => {
    const state = store.getState();
    api.get(
      state.settings.lambda_url,
      null,
      state.jwt,
      state.settings.csrf_token,
      null,
      null
    ).then((res) => {
      store.dispatch({
        type: action.type + DONE,
        original: action,
        payload: res.body
      });

      const bankId = res.body[0].id;
      api.get(
        `/repository/repositories/${bankId}/assets?fullUrls`,
        state.settings.api_url,
        state.jwt,
        state.settings.csrf_token,
        null,
        null
      ).then((res2) => {
        store.dispatch({
          type: 'GET_MEDIA_DONE',
          original: { bankId },
          payload: res2.body
        });
      });


    });
  },

  [AssessmentConstants.GET_ASSESSMENT_PREVIEW]: {
    method: Network.GET,
    url: (url, action) => {
      const bankId = encodeURIComponent(action.bankId);
      const assessmentId = encodeURIComponent(action.assessmentId);
      return `${url}/assessment/banks/${bankId}/assessments/${assessmentId}/items?qti`;
    }
  },
  [AssessmentConstants.GET_ASSESSMENTS]: {
    method : Network.GET,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/assessments?isolated`,
  },

  [AssessmentConstants.CREATE_ASSESSMENT_OFFERED]: {
    method : Network.POST,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assessmentsoffered`,
  },

  [AssessmentConstants.GET_ASSESSMENT_OFFERED]: {
    method : Network.GET,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assessmentsoffered`,
  },

  [AssessmentConstants.GET_ASSESSMENT_ITEMS]: (store, action) => {
    const state = store.getState();
    api.get(
      `assessment/banks/${action.bankId}/assessments/${action.assessmentId}/items?wronganswers`,
      state.settings.api_url,
      state.jwt,
      state.settings.csrf_token,
      null,
      null
    ).then((res) => {
      store.dispatch({
        type: action.type + DONE,
        original: action,
        payload: _.map(res.body, item => deserialize(item.genusTypeId)(item))
      });
    });
  },

  [AssessmentConstants.EDIT_OR_PUBLISH_ASSESSMENT]: {
    method : Network.POST,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assignedbankids`,
  },

  [AssessmentConstants.DELETE_ASSIGNED_ASSESSMENT]: (store, action) => {
    const state = store.getState();
    const { bankId, assessmentId, assignedId } = action;

    api.del(
      `assessment/banks/${bankId}/assessments/${assessmentId}/assignedbankids/${assignedId}`,
      state.settings.api_url,
      state.jwt,
      state.settings.csrf_token,
      null,
      null
    ).then((deleteRes) => {
      store.dispatch({
        type: action.type + DONE,
        original: action,
        payload: deleteRes.body
      });

      // if we unpublished an assessment, we need to delete admin assessment
      // takens. There should only be one assessmentOffered, but we're handling
      // the case where there is more than one.
      if (action.assignedId === state.settings.publishedBankId) {
        getAssessmentsOffered(state, bankId, assessmentId).then(res =>
          getAssessmentsTaken(state, bankId, res.body).then(
            assessmentsTaken => deleteAssessmentsTaken(
            state,
            bankId,
            assessmentsTaken,
            `osid.agent.Agent%3A${state.settings.eid}%40MIT-ODL`
          )
        ));
      }
    });
  },

  [AssessmentConstants.UPDATE_ASSESSMENT]: {
    method : Network.PUT,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/assessments/${action.body.id}`,
  },

  [AssessmentConstants.UPDATE_SINGLE_ITEM_OR_PAGE]: {
    method : Network.PUT,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/assessmentsoffered/${action.assessmentsOfferedId}`,
  },

  [AssessmentConstants.UPDATE_ASSESSMENT_ITEMS]: {
    method : Network.PUT,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/items`,
  },

  [AssessmentConstants.DELETE_ASSESSMENT_ITEM]: {
    method : Network.DEL,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/items/${action.itemId}`,
  },

  [ItemConstants.GET_ITEMS]: {
    method : Network.GET,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/items`,
  },

  [ItemConstants.CREATE_ITEM]: {
    method : Network.POST,
    url    : (url, action) => `${url}/assessment/banks/${action.bankId}/items`,
  },

  [ItemConstants.UPDATE_ITEM]: (store, action) => {
    const state = store.getState();
    const item = state.items[action.bankId][action.itemId];
    const updatedAttributes = action.body;

    const newItem = serialize(updatedAttributes.type || item.type)(item, updatedAttributes);

    api.put(
      `assessment/banks/${action.bankId}/items/${action.itemId}`,
      state.settings.api_url,
      state.jwt,
      state.settings.csrf_token,
      null,
      newItem
    ).then((res) => {
      store.dispatch({
        type: action.type + DONE,
        original: action,
        payload: deserialize(res.body.genusTypeId)(res.body)
      });
    });
  },

  [AssetConstants.UPLOAD_MEDIA]: {
    method : Network.POST,
    url    : (url, action) => `${url}/repository/repositories/${action.bankId}/assets`,
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
  [AssessmentConstants.TOGGLE_PUBLISH_ASSESSMENT] : (store, action) => {
    const state = store.getState();
    const { assessment } = action;
    const { publishedBankId, editableBankId } = state.settings;

    if (assessment.isPublished) {
      [
        assessmentActions.deleteAssignedAssessment(assessment, publishedBankId),
        assessmentActions.editOrPublishAssessment(assessment, editableBankId),
      ].forEach(newAction => store.dispatch(newAction));
    } else {
      const actions = [];
      if (_.includes(assessment.assignedBankIds, editableBankId)) {
        actions.push(assessmentActions.deleteAssignedAssessment(assessment, editableBankId));
      }

      if (_.isEmpty(assessment.assessmentOffered)) {
        actions.push(assessmentActions.createAssessmentOffered(assessment.bankId, assessment.id));
      }
      actions.push(assessmentActions.editOrPublishAssessment(assessment, publishedBankId));

      actions.forEach(newAction => store.dispatch(newAction));
    }
  }
};

export default { ...server, ...qbank };
