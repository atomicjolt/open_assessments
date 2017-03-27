import wrapper from '../../constants/wrapper';

// Local actions
const actions = [
  'UPDATE_PATH',
];

// Actions that make an api request
const requests = [
  'GET_BANKS_HIERARCHY',
  'GET_MEDIA',
];

export const Constants = wrapper(actions, requests);

export function getBanks() {
  return {
    apiCall : true,
    type    : Constants.GET_BANKS_HIERARCHY,
  };
}

export function updatePath(id, bank, back) {
  return {
    id,
    bank,
    back,
    type: Constants.UPDATE_PATH,
  };
}
