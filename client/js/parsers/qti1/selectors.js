import Immutable from 'immutable';
import { createSelector } from "reselect";

import { getItems, loadOutcomes } from "./qti";

// Input selectors. These selectors only retrieve data from state. They do not modify it.
export const assessment          = (state, props) => state.assessment.toJS();
export const questionsPerSection = (state, props) => state.settings.get('questions_per_section');
export const sections = createSelector(
  [assessment],
  (assessment) => assessment.sections
);

// Memoized selectors. These selectors transform state. Since the transformation might be
// expensive the results are memoized. The transform function will only be called if the
// input selectors change.

export const questions = createSelector(
  [ sections, questionsPerSection ],
  (sections, questionsPerSection) => getItems(sections, questionsPerSection)
);

export const outcomes = createSelector(
  [ assessment ],
  (assessment) => loadOutcomes(assessment)
);

export const questionCount = createSelector(
  [ questions ],
  (questions) => questions.length
);
