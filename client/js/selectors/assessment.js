import * as Qti1Selectors  from "../parsers/qti1/selectors";
import * as Qti2Assessment from "../parsers/qti2/selectors";
import * as EdxAssessment  from "../parsers/edX/selectors";

function getParser(standard){
  return {
    "QTI1": Qti1Selectors,
    "QTI2": Qti2Assessment,
    "EDX": EdxAssessment
  }[standard];
}

function makeSelector(name){
  return (state, props) => {
    var parser = getParser(state.assessment.get('standard'));
    if(parser === undefined){return;} // Handle no assessment loaded
    var func = parser[name];
    return func(state, props);
  };
}

// Selectors that will interact with the assessment data.
// All of these take state and props as parameters and just
// wrap a call to the selectors native to the assessment.
export const questions = makeSelector("questions");
export const outcomes = makeSelector("outcomes");
export const questionCount = makeSelector("questionCount");
