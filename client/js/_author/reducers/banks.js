// Leave this empty. It will hold banks by id. IE `state[someId] = {a_bank}`
const initialState = [];

export default function banks(state = initialState, action) {
  switch (action.type) {

    case 'GET_BANKS_HIERARCHY_DONE': {
      return action.payload;
    }

    default:
      return state;
  }
}
