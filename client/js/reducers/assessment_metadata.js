"use strict";

import { Constants as AssessmentConstants }  from "../actions/assessment";
import Immutable                             from "immutable";

const initialState = Immutable.fromJS({
  assessmentFormat: null
});

export default (state = initialState, action) => {

  switch(action.type){

    case AssessmentConstants.LOAD_ASSESSMENT_DONE:
      return state.set('assessmentFormat', action.payload.standard);
      break;

    default:
      return state;
  }

};