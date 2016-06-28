"use strict";

import Immutable  from 'immutable';
import { Constants as AssessmentConstants }   from '../actions/assessment_progress';

const initialState = Immutable.fromJS({
  isSubmitted: false,
  isStarted: false,
  currentItemIndex: 0,
  selectedAnswerId: '',
  answerMessageIndex: [], // TODO Find more appropriate name
  checkedResponses: [],
  responses: [],
  startedAt: 0,
  finishedAt: 0,
  assessmentResult:null
});

export default (state = initialState, action) => {

  switch(action.type){
    case AssessmentConstants.ASSESSMENT_NEXT_QUESTIONS:
      var currentItemIndex = state.get("currentItemIndex");
      var increment = action.pageSize;
      state = state.set("currentItemIndex", currentItemIndex + increment);
      break;

    case AssessmentConstants.ASSESSMENT_PREVIOUS_QUESTIONS:
      var currentItemIndex = state.get("currentItemIndex");
      var decrement = action.pageSize;
      state = state.set("currentItemIndex", currentItemIndex - decrement);
      break;

    case AssessmentConstants.ASSESSMENT_VIEWED:
      state = state.set("startedAt", Date.now());
      break;

    case AssessmentConstants.ANSWER_SELECTED:
      var responses = state.getIn(['responses', `${action.questionIndex}`]);
      if(responses === undefined){responses = Immutable.List();}
      responses = responses.push(action.answerId);
      state = state.setIn(["responses", `${action.questionIndex}`], responses);
      break;

    case AssessmentConstants.ASSESSMENT_CHECK_ANSWER:
      // TODO
      break;


    default:

  }
  return state;
};
