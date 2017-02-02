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

    case 'CREATE_ASSESSMENT_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.payload.bankId;
      if (!newState[bankId]) {
        newState[bankId] = {};
      }
      newState[bankId][action.payload.id] = action.payload;
      return newState;
    }

    default:
      return state;
  }
}
