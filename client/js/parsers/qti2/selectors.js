"use strict";

import $                   from "jquery";
import _                   from "lodash";
import { createSelector }  from "reselect";
import Immutable           from "immutable";

import { getItems, loadOutcomes, transformItem }  from "./qti";

// Input selectors. These selectors only retrieve data from state. They do not modify it.
// export const assessment          = (state, props) => state.assessment;
// export const sections            = (state, props) => state.sections;
// export const questionsPerSection = (state, props) => state.settings.questions_per_section;

// Memoized selectors. These selectors transform state. Since the transformation might be
// expensive the results are memoized. The transform function will only be called if the
// input selectors change.
// export const questions = createSelector(
//   [ sections, questionsPerSection ],
//   (sections, questionsPerSection) => getItems(sections, questionsPerSec)
// );

// export const outcomes = createSelector(
//   [ assessment ],
//   (assessment) => loadOutcomes(state.assessment)
// );

// export const questionCount = createSelector(
//   [ questions ],
//   (questions) => questions.length
// );

/**
 * Returns array of question indexes that are currently being displayed
 */
function currentQuestionIndexes(state){
  return _.range(
    state.assessmentProgress.get('currentItemIndex'),
    state.assessmentProgress.get('currentItemIndex') + state.settings.questions_per_page
  );
}

export function questions(state, props) {
  const item = state.assessment.item;
  return [transformItem(item.xml)];
}

export function outcomes() {
  return {};
}

export function questionCount(state, props) {
  return 1;
}

// Returns true if assessment has loaded, false otherwise.
export function assessmentLoaded(state, props){
  return !_.isEmpty(state.assessment);
}

/*
 * Returns true if api calls to check answers have not yet returned, false
 * otherwise
 */
export function isCheckingAnswer(state, props){
  // return state.assessmentProgress.get('numQuestionsChecking', 0) > 0;
  return false;
}

export function questionResults(state, props) {

  // TODO Currently we are setting the same response for all userInput.
  // When we have an example of multi answer feedback we should figure out
  // how to assign feedback to each answer.
  const questionIndexes = currentQuestionIndexes(state);

  let questionResponses = {};

  _.each(questionIndexes, (index) => {
    const result = state.assessmentResults.questionResults[index];
    if(result !== undefined) {
      const response = result[0];
      questionResponses[index] = {
        correct:    response.correct,
        answerIds:  response.userInput,
        feedback:   response.feedback
      };
    }
  });

  return questionResponses;
}

export function correctItemCount(state, props) {
  const results = state.assessmentResults.questionResults;
  const hits = results.map((r) => (r && r[0] && r[0].correct ? 1 : 0));
  return hits.reduce((a, b) => (a + b), 0);
}
