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
      _.each(action.payload, (child) => {
        if (!newState[child.bankId].children) {
          newState[child.bankId].children = {};
        }
        newState[child.bankId].children[child.id] = child;
      });
      return newState;
    }

    case 'GET_ITEMS_DONE': {
      debugger;
      const newState = _.cloneDeep(state);
      _.each(action.payload, (child) => {
        if (!newState[child.bankId].children) {
          newState[child.bankId].children = {};
        }
        newState[child.bankId].children[child.id] = child;
      });
      return newState;
    }

    default:
      return state;
  }
}
