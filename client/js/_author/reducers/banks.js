import _ from 'lodash';
// Leave this empty. It will hold banks by id. IE `state[someId] = {a_bank}`
const initialState = [];

function setParents(payload, parents) {
  const parent = _.last(parents);
  _.forEach(payload, (bank) => {
    if (bank) {
      bank.parent = parent; // eslint-disable-line no-param-reassign
      parents.push(bank);
      setParents(bank.childNodes, parents);
    }
  });
}

export default function banks(state = initialState, action) {

  switch (action.type) {

    case 'GET_BANKS_HIERARCHY_DONE': {
      const parents = [];
      setParents(action.payload, parents);
      return action.payload;
    }

    default:
      return state;
  }
}
