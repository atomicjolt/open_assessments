import wrapper from '../../constants/wrapper';

// Local actions
const actions = [
  'ADD_CHOICE',
  'ADD_ANSWER',
];

// Actions that make an api request
const requests = [
  'GET_ITEMS',
  'CREATE_ITEM',
  'UPDATE_ITEM',
];

export const Constants = wrapper(actions, requests);

export function getItems(bankId) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.GET_ITEMS,
  };
}

export function createItem(bankId, item) {
  return {
    bankId,
    apiCall : true,
    type    : Constants.CREATE_ITEM,
    body    : item
  };
}

export function updateItem(bankId, item) {
  return {
    bankId,
    itemId  : item.id,
    apiCall : true,
    type    : Constants.UPDATE_ITEM,
    body    : item
  };
}

export function updateChoice(bankId, itemId, choiceId, choice) {
  return {
    type: Constants.ADD_CHOICE,
    bankId,
    itemId,
    choiceId,
    choice,
  };
}

export function updateAnswer(bankId, itemId, answer) {
  return {
    type: Constants.ADD_ANSWER,
    bankId,
    itemId,
    answer,
  };
}

