"use strict";

import Immutable  from 'immutable';
import { Constants as AssessmentConstants }   from '../actions/assessment_progress';

const initialState = Immutable.fromJS({
  isSubmitted: false,
  isStarted: false,
  currentItemIndex: 0,
  selectedAnswerId: '',
  answerMessageIndex: '',
  responses: [],
  startedAt: 0,
  finishedAt: 0,
  assessmentResult:null
});

export default (state = initialState, action) => {

  switch(action.type){
    case AssessmentConstants.ASSESSMENT_NEXT_QUESTION:
      var currentQuestion = state.get("currentQuestion");
      state = state.set("currentQuestion", currentQuestion + 1);
      break;

    case AssessmentConstants.ASSESSMENT_PREVIOUS_QUESTION:
      var currentQuestion = state.get("currentQuestion");
      state = state.set("currentQuestion", currentQuestion - 1);
      break;

    case AssessmentConstants.ASSESSMENT_VIEWED:
      state = state.set("startedAt", Date.now());
      break;

    default:

  }
  return state;
};
