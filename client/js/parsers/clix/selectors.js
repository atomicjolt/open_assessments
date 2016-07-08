import $                   from "jquery";
import { createSelector }  from "reselect";

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

/*
 * Returns true if api calls to check answers have not yet returned, false
 * otherwise
 */
export function isCheckingAnswer(state, props){
  return state.progress.get('numQuestionsChecking', 0) > 0;
}
