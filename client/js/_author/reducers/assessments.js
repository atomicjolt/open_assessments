import _ from 'lodash';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};

export default function banks(state = initialState, action) {
  switch (action.type) {

    case 'GET_ASSESSMENTS_DONE': {
      const newState = _.cloneDeep(state);
      _.forEach(action.payload, (assessment) => {
        _.forEach(assessment.assignedBankIds, (bankId) => {
          if (!newState[bankId]) {
            newState[bankId] = {};
          }
          newState[bankId][assessment.id] = assessment;
        });
      });
      return newState;
    }

    case 'EDIT_OR_PUBLISH_ASSESSMENT_DONE': {
      const newState = _.cloneDeep(state);
      const changeId = action.original.body.assignedBankIds[0];
      const bankId = action.original.bankId;
      const assessmentId = action.original.assessmentId;
      newState[bankId][assessmentId].assignedBankIds.push(changeId);
      return newState;
    }

    case 'DELETE_ASSIGNED_ASSESSMENT_DONE': {
      const newState = _.cloneDeep(state);
      const changeId = action.original.assignedId;
      const bankId = action.original.bankId;
      const assessmentId = action.original.assessmentId;
      const index = newState[bankId][assessmentId].assignedBankIds.indexOf(changeId);
      newState[bankId][assessmentId].assignedBankIds.splice(index, 1);
      return newState;
    }

    case 'CREATE_ASSESSMENT_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.payload.bankId;
      if (!newState[bankId]) {
        newState[bankId] = {};
      }
      newState[bankId][action.payload.id] = action.payload;
      return newState;
    }

    // working
    // https://qbank-clix-dev.mit.edu//api/v1/assessment/banks/assessment.Bank%3A577fcf75c89cd90cbd5616f8%40ODL.MIT.EDU/assessments/assessment.Assessment%3A589e2038c89cd965168b810b%40ODL.MIT.EDU/assessmentsoffered

    // failing
    // https://qbank-clix-dev.mit.edu//api/v1/assessment/banks/assessment.Bank%3A57e2b4c5c89cd916208d00de%40ODL.MIT.EDU/assessments/assessment.Assessment%3A58a22a80c89cd9109610dc34%40ODL.MIT.EDU/assessmentsoffered
    case 'CREATE_ASSESSMENT_OFFERED_DONE':
    case 'GET_ASSESSMENT_OFFERED_DONE': {
      const newState = _.cloneDeep(state);
      newState[action.original.bankId][action.original.assessmentId]['assessmentOffered'] = action.payload;
      return newState;
    }

    case 'DELETE_ASSESSMENT_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.original.bankId;
      delete newState[bankId][action.original.assessmentId];
      return newState;
    }

    default:
      return state;
  }
}
