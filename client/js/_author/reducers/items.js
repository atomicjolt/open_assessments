import _          from 'lodash';
import guid       from '../../utils/guid';
import genusTypes from '../../constants/genus_types';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};


function updateChoiceData(item) {
  const newItem = _.cloneDeep(item);

  if (!newItem.question) {
    newItem.question = {
      choices: {},
    };
    return newItem;
  }

  const newChoices = {};
  _.forEach(item.question.choices, (choice, index) => {
    newChoices[choice.id] = { order: index, ...choice, correct: false };
    _.forEach(item.answers, (answer) => {
      if (_.includes(answer.choiceIds, choice.id)) {
        newChoices[choice.id] = {
          answer,
          correct: answer.genusTypeId === genusTypes.answer.rightAnswer,
          answerId: answer.id,
          ...newChoices[choice.id],
        };
      }
    });
  });
  newItem.question.choices = newChoices;
  console.log('newChoices', newChoices);
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
        newState[bankId][item.id] = updateChoiceData(item);
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

      newState[bankId][action.payload.id] = updateChoiceData(action.payload);

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
            console.log('Incorrect choice: ', incorrectChoice.text);
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
