import $                   from "jquery";
import { createSelector }  from "reselect";

import { questionResults as qtiQuestionResults }  from "../qti2/selectors";
import { transformItem }                          from "./clix";


export function questions(state, props) {
  return state.assessment.items.map(transformItem);
}

export function outcomes() {
  return {};
}

export function questionCount(state, props) {
  return state.assessment.items.length;
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
  return state.assessmentProgress.get('numQuestionsChecking', 0) > 0;
}

export function questionResults(state, props) {
  return qtiQuestionResults(state, props);
}
