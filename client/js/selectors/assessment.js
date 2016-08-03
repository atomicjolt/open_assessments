import _                   from 'lodash';
import { AssessmentFormats }  from "../parsers/assessment";
import * as ClixSelectors  from "../parsers/clix/selectors";
import * as EdxSelectors   from "../parsers/edX/selectors";
import * as Qti1Selectors  from "../parsers/qti1/selectors";
import * as Qti2Selectors  from "../parsers/qti2/selectors";


const SELECTORS_MAP = {};
SELECTORS_MAP[AssessmentFormats.CLIx] = ClixSelectors;
SELECTORS_MAP[AssessmentFormats.EdX] = EdxSelectors;
SELECTORS_MAP[AssessmentFormats.Qti1] = Qti1Selectors;
SELECTORS_MAP[AssessmentFormats.Qti2] = Qti2Selectors;

function getSelectors (standard) {
  return SELECTORS_MAP[standard];
}

function makeDispatchingSelector(name){
  return (state, props) => {
    var selectors = getSelectors(state.assessment.standard);
    if(selectors === undefined){return;} // Handle no assessment loaded
    var func = selectors[name];
    return func(state, props);
  };
}

// Selectors that will interact with the assessment data.
// All of these take state and props as parameters and just
// wrap a call to the selectors native to the assessment.
export const questions       = makeDispatchingSelector("questions");
export const outcomes        = makeDispatchingSelector("outcomes");
export const questionCount   = makeDispatchingSelector("questionCount");
export const questionResults = makeDispatchingSelector("questionResults");

// Returns true if assessment has loaded, false otherwise.
export const assessmentLoaded = makeDispatchingSelector("assessmentLoaded");

/*
 * Returns true if api calls to check answers have not yet returned, false
 * otherwise
 */
export const isCheckingAnswer = makeDispatchingSelector("isCheckingAnswer");

export const primaryActionState = makeDispatchingSelector("primaryActionState");
export const secondaryActionState = makeDispatchingSelector("secondaryActionState");

export function isFirstPage(state, props){
  return state.assessmentProgress.get('currentItemIndex') === 0;
}

export function isLastPage(state, props){
  const currentItemIndex = state.assessmentProgress.get('currentItemIndex', 0);
  const numItems = questionCount(state, props);
  const totalPages = Math.ceil(numItems / state.settings.questions_per_page);
  const currentPage = Math.floor(currentItemIndex / state.settings.questions_per_page);
  if(_.isUndefined(currentPage) || _.isUndefined(totalPages)){return false;}
  return currentPage >= totalPages;
  // return TODO add a spec
}

//TODO add a spec
export function isNextUnlocked(state){
  const unlockNext = state.settings.unlock_next;
  const questionResponses = questionResults(state);
  const questionsPerPage = state.settings.questions_per_page;

  if(unlockNext === "ON_CORRECT") {
    const incorrectResponse = _.find(questionResponses, (response) => {
      return !response.correct;
    });
    return _.isUndefined(incorrectResponse) && _.compact(_.values(questionResponses)).length === questionsPerPage;
  } else if(unlockNext === "ON_ANSWER_CHECK") {

    return _.compact(_.values(questionResponses)).length === questionsPerPage;
  }
  return true;
}

//TODO write spec
export function currentItems(state){
  if(!assessmentLoaded(state)){return;}
  const allQuestions = questions(state);
  const currentItemIndex = state.assessmentProgress.get('currentItemIndex', 0);
  const questionsPerPage = state.settings.questions_per_page;
  return allQuestions.slice(currentItemIndex, currentItemIndex + questionsPerPage);
}
