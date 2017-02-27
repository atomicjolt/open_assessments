import _                       from 'lodash';
import guid                    from '../../utils/guid';
import { types, getQbankType } from '../../constants/genus_types';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};

function deserializeChoices(choices, answers) {
  const newChoices = {};

  _.forEach(choices, (choice, index) => {
    newChoices[choice.id] = {
      id: '',
      answerId: '',
      text: '',
      order: index,
      feedback: '',
      fileIds: [],
      isCorrect: false,
    };
    _.forEach(answers, (answer) => {
      if (_.includes(answer.choiceIds, choice.id)) {
        newChoices[choice.id] = {
          ...newChoices[choice.id],
          feedback: _.get(answer, 'feedback.text'),
          isCorrect: answer.genusTypeId === types.answer.rightAnswer,
          answerId: answer.id,
        };
      }
    });
  });
  return newChoices;
}

function deserializeItem(item) {
  // The implementation of function is Q-Bank specific

  // If there is any extra data you need from Qbank Items, add it here
  // TODO: we may want to break this up by type, like the serializers
  // Or not, because we want to have all the fields right?
  // I am not sure
  const newItem = {
    id: item.id,
    type: getQbankType(item.genusTypeId),
    bankId: item.bankId,
    assessmentId: '', // TODO
    name: _.get(item, 'displayName.text'),
    question: {
      id: _.get(item, 'question.id'),
      type: getQbankType(_.get(item, 'question.genusTypeId')),
      text: _.get(item, 'question.displayName.text'),
      multipleAnswer: _.get(item, 'question.multiAnswer'),
      shuffle: _.get(item, 'question.shuffle'),
      fileIds: {},
      choices: deserializeChoices(_.get(item, 'question.choices'), item.answers)
    },
  };
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
