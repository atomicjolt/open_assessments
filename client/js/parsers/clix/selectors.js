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

//TODO document
export function isCheckingAnswer(state, props){
  return state.progress.get('checkingQuestions', 0) > 0;
}
