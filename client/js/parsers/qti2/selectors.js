import $                   from "jquery";
import { createSelector }  from "reselect";

import { getItems, loadOutcomes, transformItem }  from "./qti";

// Input selectors. These selectors only retrieve data from state. They do not modify it.
// export const assessment          = (state, props) => state.assessment;
// export const sections            = (state, props) => state.sections;
// export const questionsPerSection = (state, props) => state.settings.get('questions_per_section');

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
