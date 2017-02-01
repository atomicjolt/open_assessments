import wrapper from '../../constants/wrapper';

// Local actions
const actions = [
];

// Actions that make an api request
const requests = [
  'GET_ITEMS',
];

export const Constants = wrapper(actions, requests);

export function getBankItems(bank) {
  return {
    bank,
    apiCall : true,
    type    : Constants.GET_ITEMS,
  };
}