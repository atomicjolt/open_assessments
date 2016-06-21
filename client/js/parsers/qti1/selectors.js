import { createSelector } from "reselect";

import { getItems, loadOutcomes } from "./qti";

// Input selectors. These selectors only retrieve data from state. They do not modify it.
export const assessment          = (state, props) => state.assessment;
export const questionsPerSection = (state, props) => state.settings.questions_per_section;

// Memoized selectors. These selectors transform state. Since the transformation might be
// expensive the results are memoized. The transform function will only be called if the
// input selectors change.
export const sections = createSelector(
  [ assessment ],
  (assessment) => assessment.get('sections')
);

export const questions = createSelector(
  [ sections, questionsPerSection ],
  (sections, questionsPerSection) => getItems(sections, questionsPerSection)
);

export const outcomes = createSelector(
  [ sections ],
  (sections) => loadOutcomes(sections)
);

export const questionCount = createSelector(
  [ questions ],
  (questions) => questions.length
);
