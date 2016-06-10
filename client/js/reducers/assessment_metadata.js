"use strict";

import { Constants as AssessmentConstants }  from "../actions/assessment";
import { assessmentFormat }                  from "../parsers/parse_assessment";
import Immutable                             from "immutable";

const initialState = Immutable.fromJS({
  assessmentFormat: null
});

export default (state = initialState, action) => {

  switch(action.type){

    case AssessmentConstants.LOAD_ASSESSMENT_DONE:
      return state.set('assessmentFormat', assessmentFormat(state.assessment));
      break;

    default:
      return state;
  }

};