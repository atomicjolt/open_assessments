import $                   from "jquery";
import _                   from "lodash";
import { createSelector }  from "reselect";

import * as qtiSelectors  from "../qti2/selectors";
import { transformItem }  from "./clix";


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
  return qtiSelectors.questionResults(state, props);
}

export function correctItemCount(state, props) {
  return qtiSelectors.correctItemCount(state, props);
}
