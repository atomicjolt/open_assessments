import _          from 'lodash';
import guid       from '../../utils/guid';
import genusTypes from '../../constants/genus_types';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};

// TODO: this may be better suited in a utils file, maybe...
function answerType(itemType) {
  switch (itemType) {
    case genusTypes.item.multipleChoice:
      return genusTypes.answer.multipleChoice;

    case genusTypes.item.fileUpload:
    case genusTypes.item.audioUpload:
      return genusTypes.answer.file;

    default:
      return null;
  }
}

export default function banks(state = initialState, action) {
  switch (action.type) {

    case 'GET_ITEMS_DONE': {
      const newState = _.cloneDeep(state);
      // const bankId = action.original.bankId;
      // if (!newState[bankId]) {
      //   newState[bankId] = {};
      // }
      // _.forEach(action.payload, (assessment) => {
      //   newState[bankId][assessment.id] = assessment;
      // });
      return newState;
    }

    case 'GET_ASSESSMENT_ITEMS_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.original.bankId;
      if (!newState[bankId]) {
        newState[bankId] = {};
      }

      _.each(action.payload, (item) => {
        newState[bankId][item.id] = item;
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

      newState[bankId][action.payload.id] = action.payload;

      return newState;
    }

    case 'ADD_CHOICE': {
      const newState = _.cloneDeep(state);
      const { bankId, itemId, choice } = action;
      if (!newState[bankId][itemId].question) {
        newState[bankId][itemId].question = {
          questionString: action.questionString || '',
          choices: [{
            id: guid(),
            text: choice.text,
          }]
        };
      } else if (choice.id) {
        const foundChoice = _.find(newState[bankId][itemId].question.choices, { id: choice.id });
        if (foundChoice) {
          foundChoice.text = choice.text;
        } else {
          newState[bankId][itemId].question.choices.push(choice);
        }
      } else {
        newState[bankId][itemId].question.choices.push({ id: guid(), text: choice.text });
      }
      return newState;
    }

    case 'ADD_ANSWER': {
      const newState = _.cloneDeep(state);
      const { bankId, itemId, answer } = action;
      const item = newState[bankId][itemId];
      const answerTypeId = genusTypes.answer;

      const answerItemIndex = _.find(item.answers, answerItem => _.find(answerItem.choiceIds, answer.choiceId));

      if (answerItemIndex) {
        newState[bankId][itemId].answers[answerItemIndex] = {
          ...newState[bankId][itemId].answers[answerItemIndex],
          ...answer,
        };
      } else {
        const newAnswer = {
          ...{
            genusTypeId: answer.correct ? answerTypeId.rightAnswer : answerTypeId.wrongAnswer,
            type: answerType(item.genusTypeId),
            choiceIds: [answer.choiceId]
          },
          ...answer
        };
        newState[bankId][itemId].answers.push(newAnswer);
      }
      return newState;
    }

    default:
      return state;
  }
}
