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

    case 'GET_BANK_CHILDREN': {
      return { ...state, ...{ loading: true } };
    }
    case 'GET_ASSESSMENTS_DONE': {
      state.location.push({
        id: action.original.bankId,
      });
      return { ...state, ...{ loading: false, location: state.location } };
    }

    default:
      return state;
  }
}
