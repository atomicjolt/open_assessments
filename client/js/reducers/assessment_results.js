"use strict";

import Immutable  from 'immutable';

import { Constants }  from '../actions/assessment_progress';

const initialState = Immutable.fromJS({
  questionResults: []
});

export default (state = initialState, action) => {

  switch(action.type) {
    case Constants.ASSESSMENT_CHECK_ANSWER_DONE:
      if(action.error) break;

      if(!state.hasIn(['questionResults', action.questionIndex])) {
        state = state.setIn(
          ['questionResults', action.questionIndex],
          Immutable.List()
        );
      }

      state = state.setIn(
        ['questionResults', action.questionIndex],
        state.getIn(
          ['questionResults', action.questionIndex]
        ).unshift(action.payload)
      );

      break;
  }

  return state;
};
