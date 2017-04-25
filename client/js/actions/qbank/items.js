import wrapper from '../../constants/wrapper';
import { scrub } from '../../middleware/serialization/serializer_utils';

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  'CREATE_ITEM',
  'UPDATE_ITEM',
];

export const Constants = wrapper(actions, requests);

export function updateItem(bankId, item) {
  return {
    bankId,
    itemId  : item.id,
    apiCall : true,
    type    : Constants.UPDATE_ITEM,
    body    : item
  };
}

export function createChoice(bankId, itemId, text, fileIds, choiceType, language) {
  const newItem = {
    id: itemId,
    language,
    question: {
      fileIds,
      [choiceType || 'choices']: {
        new: {
          id: 'new',
          language,
        },
      },
    },
    language
  };
  return {
    bankId,
    itemId,
    apiCall : true,
    type    : Constants.UPDATE_ITEM,
    body    : scrub(newItem)
  };
}
