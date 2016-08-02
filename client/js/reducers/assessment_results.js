"use strict";

import Immutable  from 'immutable';

import { Constants }  from '../actions/assessment_progress';

const initialState = Object.freeze({
  questionResults: Object.freeze([])
});

export default (state = initialState, action) => {

  switch(action.type) {
    case Constants.ASSESSMENT_CHECK_ANSWER_DONE:
      if(action.error) break;

      const idx = action.questionIndex;
      let questionResults = Array.from(state.questionResults);
      let responses = questionResults[idx] || [];
      questionResults[idx] = Object.freeze([action.payload].concat(responses));
      Object.freeze(questionResults);
      state = Object.freeze(Object.assign({}, state, {questionResults}));
      break;
  }

  return state;
};
