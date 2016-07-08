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
