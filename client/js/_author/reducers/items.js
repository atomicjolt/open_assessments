import _ from 'lodash';

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

    default:
      return state;
  }
}
