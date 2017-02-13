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

    case 'ASSIGNED_ASSESSMENT_DONE': {
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
