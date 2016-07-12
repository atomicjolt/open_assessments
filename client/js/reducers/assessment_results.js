"use strict";

import Immutable  from 'immutable';
import { Constants as AssessmentProgressConstants }   from '../actions/assessment_progress';

const initialState = Immutable.fromJS({
  questionResults: {}
});

export default (state = initialState, action) => {

  switch(action.type){
    case AssessmentProgressConstants.ASSESSMENT_CHECK_ANSWER_DONE:
      if(!action.error){
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
      }
      break;
    default:

  }
  return state;
};
