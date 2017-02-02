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
        id    : action.original.bank.id,
        name  : 'sven',
      });
      return { ...state, ...{ loading: false, location: state.location } };
    }

    case 'UPDATE_PATH': {
      if (!action.id) {
        return { ...state, ...{ location: [] } };
      }

      const pathIndex = _.findIndex(state.location, { id: action.id });
      const newLocation = _.cloneDeep(state.location);

      if (pathIndex > -1) {
        newLocation.length = pathIndex + 1;
      } else {
        newLocation.push({
          id    : action.id,
          name  : action.name,
        });
      }
      return { ...state, ...{ location: newLocation } };
    }

    default:
      return state;
  }
}
