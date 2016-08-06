import $                   from "jquery";
import _                   from "lodash";
import { createSelector }  from "reselect";

import { SECONDARY_ACTION, PRIMARY_ACTION }                       from "../../components/assessments/two_button_nav";
import { isFirstPage, isLastPage, isNextUnlocked, currentItems }  from "../../selectors/assessment";
import { localizeStrings }                                        from "../../selectors/localize";
import { transformItem }                                          from "./clix";

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

  // TODO Currently we are setting the same response for all userInput.
  // When we have an example of multi answer feedback we should figure out
  // how to assign feedback to each answer.
  const questionIndexes = _.range(
    state.assessmentProgress.get('currentItemIndex'),
    state.assessmentProgress.get('currentItemIndex') + state.settings.questions_per_page
  );

  let questionResponses = {};

  _.each(questionIndexes, (index) => {
    const response = state.assessmentResults.getIn(['questionResults', index, 0]);
    if(response) {
      questionResponses[index] = {};
      questionResponses[index].correct = response.correct;
      questionResponses[index].answerIds = response.userInput;
      questionResponses[index].feedback = response.feedback;
    }
  });

  return questionResponses;
}

export function checkButtonText(state, props) {
  const localizedStrings = localizeStrings(state, props).twoButtonNav;
  const item = currentItems(state)[0];

  switch(item.question_type) {
    case "text_input_question":
    case "text_only_question":
    case "short_answer_question":
      return localizedStrings.saveAnswerButton;

    case "audio_upload_question":
      return localizedStrings.saveFileButton;

    default:
      return localizedStrings.checkAnswerButton;
  }
}

/**
 * Returns an object containing the state of the nav primary action button
 * in the form {spinner: boolean, buttonState: PRIMARY_ACTION[*]}
 * Where buttonState is the current state of the primary button
 * e.g.(PRIMARY_ACTION.NEXT, PRIMARY_ACTION.SUBMIT), and spinner
 * is whether or not a spinner should be applied to the button.
 */
export function primaryActionState(state, props){
  const nextUnlocked = isNextUnlocked(state);
  const lastPage = isLastPage(state);
  const items = currentItems(state);
  const item = items[0];
  var primaryActionState = {spinner: false}; // Spinner defaults to false

  if(nextUnlocked === true && lastPage === true){
    primaryActionState.buttonState = PRIMARY_ACTION.SUBMIT;
  } else if(nextUnlocked === true){
    primaryActionState.buttonState = PRIMARY_ACTION.NEXT;
  } else {

    // If we are checking an answer, then set spinner to true
    if(isCheckingAnswer(state)) { primaryActionState.spinner = true; }

    primaryActionState.buttonState = PRIMARY_ACTION.CHECK_ANSWERS;
  }
  return primaryActionState;
}

 /**
  * Returns an object containing the state of the nav secondary action button
  * in the form {buttonState: PRIMARY_ACTION[*]}
  * Where buttonState is the current state of the secondary button.
  * e.g.(SECONDARY_ACTION.NONE, SECONDARY_ACTION.PREV).
  */
export function secondaryActionState(state, props){
  if(isFirstPage(state) === true){return {buttonState: SECONDARY_ACTION.NONE};}
  return {buttonState: SECONDARY_ACTION.PREV};
}
