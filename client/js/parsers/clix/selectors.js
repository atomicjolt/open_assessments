import $                   from "jquery";
import { createSelector }  from "reselect";

import { transformItem }  from "./clix";


export function questions(state, props) {
  console.log("questions", state, props);
  return state.assessment.items.map(transformItem);
}

export function outcomes() {
  return {};
}

export function questionCount(state, props) {
  return 1;
}
