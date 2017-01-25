import _                   from 'lodash';
import { createSelector }  from 'reselect';

import { AssessmentFormats }  from '../../parsers/assessment';
import * as ClixSelectors     from '../../parsers/clix/selectors';
import * as EdxSelectors      from '../../parsers/edX/selectors';
import * as Qti1Selectors     from '../../parsers/qti1/selectors';
import * as Qti2Selectors     from '../../parsers/qti2/selectors';


const SELECTORS_MAP = {
  [AssessmentFormats.CLIx] : ClixSelectors,
  [AssessmentFormats.EdX]  : EdxSelectors,
  [AssessmentFormats.Qti1] : Qti1Selectors,
  [AssessmentFormats.Qti2] : Qti2Selectors
};

function getSelectors(standard) {
  return SELECTORS_MAP[standard];
}

function makeDispatchingSelector(name) {
  return (state, props) => {
    const selectors = getSelectors(state.assessment.standard);
    if (selectors === undefined) { return null; } // Handle no assessment loaded
    const func = selectors[name];
    return func(state, props);
  };
}

// Selectors that will interact with the assessment data.  All of these take
// state and props as parameters and just wrap a call to the selectors native to
// the assessment.

export const questions        = makeDispatchingSelector('questions');
export const outcomes         = makeDispatchingSelector('outcomes');
export const questionCount    = makeDispatchingSelector('questionCount');
export const questionResults  = makeDispatchingSelector('questionResults');

/**
 * How many Items the student has answered correctly, whether those Items have
 * single or multiple interactions.
 */
export const correctItemCount = makeDispatchingSelector('correctItemCount');

// Returns true if assessment has loaded, false otherwise.
export const assessmentLoaded = makeDispatchingSelector('assessmentLoaded');

/**
 * Returns true if api calls to check answers have not yet returned, false
 * otherwise
 */
export const isCheckingAnswer = makeDispatchingSelector('isCheckingAnswer');

/**
 * The text to display to the user on the 'Check Answer' button.  The text
 * depends on what type of Interactions are displayed.
 */
export const checkButtonText = makeDispatchingSelector('checkButtonText');

export const primaryActionState = makeDispatchingSelector('primaryActionState');
export const secondaryActionState = makeDispatchingSelector('secondaryActionState');

// Selectors that interact with abstracted assessment data that has come from the
// format specific selectors. This logic can be shared by all assessment backends.
const currentItemIndex = state => state.assessmentProgress.get('currentItemIndex');
const itemsPerPage = state => state.settings.questions_per_page;

/**
 * Returns true if the current page of items is the first page of items,
 * false otherwise
 */
export const isFirstPage = createSelector(
  currentItemIndex,
  (currentItemIndex) => {
    return currentItemIndex === 0;
  }
);

/**
 * Internal logic to determine if we are on the last page. This function should
 * only be used by the isLastPage selector, and is exported for testing purposes.
 */
export function _isLastPage(currentItemIndex, numItems, itemsPerPage) {
  const totalPages = Math.ceil(numItems / itemsPerPage);
  const currentPage = Math.floor(currentItemIndex / itemsPerPage) + 1;
  return currentPage >= totalPages;
}

/**
 * Returns true if the current page of items is the last page, false otherwise.
 */
export const isLastPage = createSelector(
  currentItemIndex,
  questionCount,
  itemsPerPage,
  _isLastPage
);

/**
 * Internal logic to determine if the next set of questions should be unlocked.
 * This function should only be used by the isNextUnlocked selector, and is exported
 * for testing purposes.
 */
export function _isNextUnlocked(unlockNext, questionResults, questionsPerPage, requireNAnswers) {
  if (requireNAnswers !== -1) return true;

  switch (unlockNext) {
    case 'ON_CORRECT':
      const incorrectResponse = _.find(questionResults, response => !response.correct);
      return _.isUndefined(incorrectResponse) && _.compact(_.values(questionResults)).length === questionsPerPage;

    case 'ON_ANSWER_CHECK':
      return _.compact(_.values(questionResults)).length === questionsPerPage;

    default:
      return true;
  }
}

/**
 * Determine if user should be allowed to go to next questions or not
 */
export const isNextUnlocked = createSelector(
  state => state.settings.unlock_next,
  questionResults,
  itemsPerPage,
  state => state.assessment.requireNAnswers,
  _isNextUnlocked
);

/**
 * Internal logic to determine if the previous set of questions should be
 * unlocked.  This function should only be used by the isPrevUnlocked selector,
 * and is exported for testing purposes.
 */
export function _isPrevUnlocked() {
  return true;
}

/**
 * Determine if user should be allowed to go to previous questions or not.
 */
export const isPrevUnlocked = createSelector(_isPrevUnlocked);

/**
 * Internal logic to calculate the current page of questions. This function
 * should only be used by the currentItems selector, and is exported
 * for testing purposes.
 */
export function _currentItems(allQuestions, currentItemIndex, questionsPerPage, assessmentLoaded) {
  if (!assessmentLoaded) { return []; }
  return allQuestions.slice(currentItemIndex, currentItemIndex + questionsPerPage);
}

export const currentItems = createSelector(
  questions,
  currentItemIndex,
  itemsPerPage,
  assessmentLoaded,
  _currentItems
);
