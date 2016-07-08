"use strict";

import Immutable  from 'immutable';
import { Constants as AssessmentConstants }   from '../actions/assessment_progress';

const initialState = Immutable.fromJS({
  isSubmitted: false,
  isStarted: false,
  currentItemIndex: 0,

  // Number of 'check answer' api calls that have not yet returned 
  numQuestionsChecking: 0,
  selectedAnswerId: '',
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
      if(responses === undefined || action.exclusive === true){
        // Create new list if no list exists or multi answer is not allowed
        responses = Immutable.List();
      }

      var answerIndex = responses.indexOf(action.answerId);
      var shouldToggle = !action.exclusive;

      // Only add answer to responses array if it doesn't exist
      if(answerIndex > -1){
        // Don't toggle Radio buttons
        if(shouldToggle){responses = responses.delete(answerIndex);}

      } else {
        responses = responses.push(action.answerId);
      }

      state = state.setIn(["responses", `${action.questionIndex}`], responses);
      break;

    case AssessmentConstants.ASSESSMENT_CHECK_ANSWER_DONE:

      var checkedResponses = Immutable.Map();

      // TODO Currently we are setting the same response for all choiceIds.
      // When we have an example of multi answer feedback we should figure out
      // how to assign feedback to each answer.
      action.choiceIds.forEach((id) => {
        var feedback = Immutable.Map(action.payload);
        checkedResponses = checkedResponses.set(id,feedback);
      });

      state = state.setIn(
        ['checkedResponses', `${action.questionIndex}`],
        checkedResponses
      );

      // Decrement number of questions being checked
      var checked = state.get('numQuestionsChecking');
      if(checked <= 0){
        throw "ASSESSMENT_CHECK_ANSWER_DONE dispatched when no answers were being checked";
      }
      state = state.set('numQuestionsChecking', --checked);
      break;

    case AssessmentConstants.CHECK_QUESTIONS:
      var checking = state.get('numQuestionsChecking');
      state = state.set('numQuestionsChecking', action.numQuestions + checking);

      break;


    default:

  }
  return state;
};
