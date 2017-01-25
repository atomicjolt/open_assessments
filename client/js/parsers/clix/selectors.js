import _                   from 'lodash';

import { SECONDARY_ACTION, PRIMARY_ACTION }                       from '../../_player/components/assessments/two_button_nav';
import { isFirstPage, isLastPage, isNextUnlocked, currentItems }  from '../../_player/selectors/assessment';
import  localizeStrings                                      from '../../_player/selectors/localize';
import * as qtiSelectors                                          from '../qti2/selectors';
import { transformItem }                                          from './clix';

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
export function assessmentLoaded(state, props) {
  return !_.isEmpty(state.assessment);
}

/*
 * Returns true if api calls to check answers have not yet returned, false
 * otherwise
 */
export function isCheckingAnswer(state, props) {
  return state.assessmentProgress.get('numQuestionsChecking', 0) > 0;
}

export function questionResults(state, props) {
  return qtiSelectors.questionResults(state, props);
}

export function correctItemCount(state, props) {
  return qtiSelectors.correctItemCount(state, props);
}

export function checkButtonText(state, props) {
  const localizedStrings = localizeStrings(state, props).twoButtonNav;
  const item = currentItems(state)[0];

  switch (item.question_type) {
    case 'text_input_question':
    case 'text_only_question':
    case 'short_answer_question':
    case 'survey_question':
      return localizedStrings.saveAnswerButton;

    case 'file_upload_question':
    case 'audio_upload_question':
    case 'movable_words_sandbox':
      return localizedStrings.saveFileButton;

    default:
      return localizedStrings.checkAnswerButton;
  }
}

export function isNofM(state) {
  return state.assessment.requireNAnswers !== -1;
}

/**
 * Returns an object containing the state of the nav primary action button
 * in the form {spinner: boolean, buttonState: PRIMARY_ACTION[*]}
 * Where buttonState is the current state of the primary button
 * e.g.(PRIMARY_ACTION.NEXT, PRIMARY_ACTION.SUBMIT), and spinner
 * is whether or not a spinner should be applied to the button.
 */
export function primaryActionState(state, props) {
  const nextUnlocked = isNextUnlocked(state);
  const lastPage = isLastPage(state);

  if (nextUnlocked === true && lastPage === true) {
    return PRIMARY_ACTION.SUBMIT;
  } else if (nextUnlocked === true) {
    return PRIMARY_ACTION.NEXT;
  } else {
    return PRIMARY_ACTION.CHECK_ANSWERS;
  }
}

/**
 * Returns an object containing the state of the nav secondary action button in
 * the form {buttonState: PRIMARY_ACTION[*]} Where buttonState is the current
 * state of the secondary button.  e.g.(SECONDARY_ACTION.NONE,
 * SECONDARY_ACTION.PREV).
 */
export function secondaryActionState(state, props) {
  var hide = !(isNofM(state)) || isFirstPage(state);
  return {
    buttonState: hide ? SECONDARY_ACTION.NONE : SECONDARY_ACTION.PREV
  };
}
