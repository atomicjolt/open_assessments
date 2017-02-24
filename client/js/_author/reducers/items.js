import _                from 'lodash';
import guid             from '../../utils/guid';
import { getQbankType } from '../../constants/genus_types';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};

// This takes what we get from the backend and makes it how we want to use it
function deserializeItem(item) {
  // The implementation of function is Q-Bank specific

  // If there is any extra data you need from Qbank Items, add it here
  const newItem = {
    id: getQbankType(),
    type: getQbankType(),
    bankId: '',
    assessmentId: '',
    name: '',
    question: {
      id: '',
      type: getQbankType(),
      text: '',
      multipleAnswer: false,
      shuffle: false,
      fileIds: [],
      choices: deserializeChoices()
    },
  };
  debugger;
  // Do some cool things here
  return newItem;
}


function deserializeChoices(item) {
  const newChoice = {
    id: '',
    answerId: '',
    text: '',
    order: 0,
    feedback: '',
    fileIds: [],
    isCorrect: false,
  };
  // TODO: Everything below this line
  if (!newItem.question) {
    newItem.question = {
      choices: {},
    };
    return newItem;
  }

  const newChoices = {};
  _.forEach(item.question.choices, (choice, index) => {
    newChoices[choice.id] = {
      order: index,
      ...choice,
      correct: false
    };
    _.forEach(item.answers, (answer) => {
      if (_.includes(answer.choiceIds, choice.id)) {
        newChoices[choice.id] = {
          answer,
          ...newChoices[choice.id],
          feedback: _.get(answer, 'feedback.text'),
          correct: answer.genusTypeId === genusTypes.answer.rightAnswer,
          answerId: answer.id,
        };
      }
    });
  });
  newItem.question.choices = newChoices;
  return newItem;
}

export default function banks(state = initialState, action) {
  switch (action.type) {
    case 'GET_ASSESSMENT_ITEMS_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.original.bankId;
      if (!newState[bankId]) {
        newState[bankId] = {};
      }

      _.each(action.payload, (item) => {
        newState[bankId][item.id] = deserializeItem(item);
      });

      return newState;
    }

    case 'UPDATE_ITEM_DONE':
    case 'CREATE_ITEM_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.original.bankId;
      if (!newState[bankId]) {
        newState[bankId] = {};
      }

      newState[bankId][action.payload.id] = deserializeItem(action.payload);

      return newState;
    }

    case 'ADD_CHOICE': {
      const newState = _.cloneDeep(state);
      const { bankId, itemId, choiceId, choice } = action;

      if (!choiceId) {
        const newId = guid();
        newState[bankId][itemId].question.choices[newId] = {
          id: newId,
          text: '',
          feedback: '',
          correct: false,
          order: _.size(newState[bankId][itemId].question.choices),
        };
        return newState;
      }

      newState[bankId][itemId].question.choices[choiceId] = {
        ...newState[bankId][itemId].question.choices[choiceId],
        ...choice
      };

      if (choice.correct) {
        _.forEach(newState[bankId][itemId].question.choices, (incorrectChoice) => {
          if (incorrectChoice.id !== choiceId) {
            incorrectChoice.correct = false;
          }
        });
      }
      return newState;
    }

    default:
      return state;
  }
}
