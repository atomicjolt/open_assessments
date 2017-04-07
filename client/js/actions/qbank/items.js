import wrapper from '../../constants/wrapper';
import { scrub } from '../../middleware/serialization/serializer_utils';

// Local actions
const actions = [];

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

export function updateItem(bankId, item) {
  return {
    bankId,
    itemId  : item.id,
    apiCall : true,
    type    : Constants.UPDATE_ITEM,
    body    : item
  };
}

export function createChoice(bankId, itemId, text, fileIds, choiceType) {
  const newItem = {
    id: itemId,
    question: {
      fileIds,
      [choiceType || 'choices']: {
        new: { id: 'new' },
      },
    }
  };
  return {
    bankId,
    itemId,
    apiCall : true,
    type    : Constants.UPDATE_ITEM,
    body    : scrub(newItem)
  };
}
