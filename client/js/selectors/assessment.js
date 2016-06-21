import * as Qti1Selectors  from "../parsers/qti1/selectors";
import * as Qti2Selectors  from "../parsers/qti2/selectors";
import * as EdxSelectors   from "../parsers/edX/selectors";

function getSelectors(standard){
  return {
    "QTI1": Qti1Selectors,
    "QTI2": Qti2Selectors,
    "EDX": EdxSelectors
  }[standard];
}

function makeDispatchingSelector(name){
  return (state, props) => {
    var selectors = getSelectors(state.assessment.get('standard'));
    if(selectors === undefined){return;} // Handle no assessment loaded
    var func = selectors[name];
    return func(state, props);
  };
}

// Selectors that will interact with the assessment data.
// All of these take state and props as parameters and just
// wrap a call to the selectors native to the assessment.
export const questions      = makeDispatchingSelector("questions");
export const outcomes       = makeDispatchingSelector("outcomes");
export const questionCount  = makeDispatchingSelector("questionCount");
