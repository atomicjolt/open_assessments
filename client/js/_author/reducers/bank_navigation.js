import _ from 'lodash';

const initialState = {
  loading   : false,
  location  : [],
};

function setParents(bank, locations) {
  const payload = { id: bank.id, name: bank.displayName.text };
  if (bank.parent) {
    locations.unshift(payload);
    setParents(bank.parent, locations);
  } else {
    locations.unshift(payload);
  }
}

export default function bankNavigation(state = initialState, action) {
  switch (action.type) {
    case 'GET_BANKS_HIERARCHY': {
      return { ...state, loading: true };
    }
    case 'GET_BANKS_HIERARCHY_DONE': {
      return { ...state, loading: false };
    }

    case 'UPDATE_PATH': {
      if (!action.id) {
        return { ...state, location: [] };
      }
      const locations = [];

      const pathIndex = _.findIndex(state.location, { id: action.id });
      const newLocation = _.cloneDeep(state).location;
      if (pathIndex > -1) {
        newLocation.length = pathIndex + 1;
        newLocation[pathIndex].back = action.back;
      } else {
        newLocation.push({
          id    : action.id,
          name  : action.bank.displayName.text,
          back  : action.back,
        });
      }

      if (action.back !== -1) {
        setParents(action.bank, locations);
        return { ...state, location: locations };
      }
      return { ...state, location: newLocation };
    }

    default:
      return state;
  }
}
