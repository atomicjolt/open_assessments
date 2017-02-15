import _    from 'lodash';
import guid from '../../utils/guid';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};

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

    default:
      return state;
  }
}
