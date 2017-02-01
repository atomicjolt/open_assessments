import _ from 'lodash';

const initialState = {
  loading   : false,
  location  : [],
};

export default function bankNavigation(state = initialState, action) {
  switch (action.type) {
    case 'GET_BANKS': {
      return { ...state, ...{ loading: true } };
    }
    case 'GET_BANKS_DONE': {
      return { ...state, ...{ loading: false } };
    }

    case 'GET_SUB_BANKS': {
      return { ...state, ...{ loading: true } };
    }
    case 'GET_SUB_BANKS_DONE': {
      state.location.push({
        id: action.original.bank.id,
        name: 'sven',
      });
      return { ...state, ...{ loading: false, location: state.location } };
    }

    case 'UPDATE_PATH': {
      // TODO: go back
      state.location.push({
        id    : action.id,
        name  : action.name,
      });
      return { ...state, ...{ location: state.location } };
    }

    default:
      return state;
  }
}
