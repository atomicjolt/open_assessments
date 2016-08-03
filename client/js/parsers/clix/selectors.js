import $                   from "jquery";
import { createSelector }  from "reselect";

import { transformItem }  from "./clix";
import { SECONDARY_ACTION, PRIMARY_ACTION }   from "../../components/assessments/two_button_nav";
import { isFirstPage, isLastPage, isNextUnlocked, currentItems } from "../../selectors/assessment";

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

export function primaryActionState(state){
  const nextUnlocked = isNextUnlocked(state);
  const lastPage = isLastPage(state);
  const items = currentItems(state);

  if(nextUnlocked === true && lastPage === true){
    return PRIMARY_ACTION.SUBMIT;
  } else if(nextUnlocked === true){
    return PRIMARY_ACTION.NEXT;
  } else if(isCheckingAnswer(state)) {
    return PRIMARY_ACTION.SPINNER;
  } else {
    // We haven't discussed how to handle making nav decisions when we are
    // rendering more than one question. So for now, just choose the first one.
    let item = items[0];
    switch(item.question_type){
      case "text_input_question":
      case "text_only_question":
      case "short_answer_question":
        return PRIMARY_ACTION.SAVE_ANSWERS;
        break;

      case "audio_upload_question":
        return PRIMARY_ACTION.SAVE_FILES;
        break;
      default:
        return PRIMARY_ACTION.CHECK_ANSWERS;
    }
  }
}

export function secondaryActionState(state){
  if(isFirstPage(state) === true){return SECONDARY_ACTION.NONE;}
  return SECONDARY_ACTION.PREV;
}
