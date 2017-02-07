import _ from 'lodash';

const initialState = {
  loading   : false,
  location  : [],
};

export default function bankNavigation(state = initialState, action) {
  switch (action.type) {
    case 'GET_BANKS_HIERARCHY': {
      return { ...state, ...{ loading: true } };
    }
    case 'GET_BANKS_HIERARCHY_DONE': {
      return { ...state, ...{ loading: false } };
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
