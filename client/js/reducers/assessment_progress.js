"use strict";

import Immutable  from 'immutable';
import { Constants as AssessmentConstants }   from '../actions/assessment';

const initialState = Immutable.fromJS({
  isSubmitted: false,
  isStarted: false,
  currentItemIndex: 0,
  selectedAnswerId: '',
  answerMessageIndex: '',
  responses: [],
  startedAt: 0,
  finishedAt: 0
});

export default (state = initialState, action) => {

  switch(action.type){
    case AssessmentConstants.NEXT_ITEM:
      var currentQuestion = state.get("currentQuestion");
      state = state.set("currentQuestion", currentQuestion + 1);
      break;

    case AssessmentConstants.PREVIOUS_ITEM:
      var currentQuestion = state.get("currentQuestion");
      state = state.set("currentQuestion", currentQuestion - 1);
      break;
    default:

  }
  return state;
};
