import _ from 'lodash';

// Leave this empty. It will hold banks by id. IE `state[someId] = {a_bank}`
const initialState = {};

function addPathIds(bank, path) {
  path = `${path}/${bank.id}`;
  bank.pathId = path;
  bank.childNodes.forEach((b) => { addPathIds(b, path); });
}

export default function banks(state = initialState, action) {
  switch (action.type) {

    case 'GET_BANKS_HIERARCHY_DONE': {
      const newBanks = action.payload;
      _.forEach(newBanks, bank => addPathIds(bank, ''));
      return newBanks;
    }

    default:
      return state;
  }
}
