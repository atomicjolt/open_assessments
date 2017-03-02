import _ from 'lodash';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};

export default function banks(state = initialState, action) {
  switch (action.type) {

    case 'GET_ASSESSMENT_ITEMS_DONE':
    case 'UPDATE_ASSESSMENT_ITEMS_DONE':
    case 'CREATE_ITEM_IN_ASSESSMENT_DONE': {
      const newState = _.cloneDeep(state);
      newState[action.original.assessmentId] = _.map(action.payload, 'id');
      return newState;
    }

    case 'CREATE_ITEM_IN_ASSESSMENT': {
      const newState = _.cloneDeep(state);
      if (action.newItemId) {
        newState[action.original.assessmentId].push(action.newItemId);
      }
      return newState;
    }

    case 'DELETE_ASSESSMENT_ITEM_DONE': {
      const newState = _.cloneDeep(state);

      _.pull( // _.pull mutates the array
        newState[action.original.assessmentId],
        action.original.itemId
      );

      return newState;
    }

    case 'CREATE_ASSESSMENT_WITH_ITEM_DONE': {
      const newState = _.cloneDeep(state);

      newState[action.assessmentId] = _.map(action.payload, 'id');
      return newState;
    }

    default:
      return state;
  }
}
