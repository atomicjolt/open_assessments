import _ from 'lodash';

// Leave this empty. It will hold banks by id. IE `state[someId] = {a_bank}`
const initialState = {};

export default function banks(state = initialState, action) {
  switch (action.type) {
    case 'GET_BANKS_DONE': {
      const newState = _.cloneDeep(state);
      _.each(action.payload, (bank) => {
        newState[bank.id] = bank;
      });
      return newState;
    }

    case 'GET_ASSESSMENTS_DONE': {
      const newState = _.cloneDeep(state);
      _.each(action.payload, (assessment) => {
        if (!newState[assessment.bankId].assessments) {
          newState[assessment.bankId].assessments = {};
        }
        newState[assessment.bankId].assessments[assessment.id] = assessment;
      });
      return newState;
    }

    default:
      return state;
  }
}
