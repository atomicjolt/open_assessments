import wrapper from '../../constants/wrapper';

// Local actions
const actions = [
];

// Actions that make an api request
const requests = [
  'GET_ITEMS',
];

export const Constants = wrapper(actions, requests);

export function getItems(bankId) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.GET_ITEMS,
  };
}
