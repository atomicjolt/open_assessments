"use strict";
import { Constants as AssessmentConstants }  from "../actions/assessment";

const initialState = {};

export default (state = initialState, action) => {

  switch(action.type){

    case AssessmentConstants.LOAD_ASSESSMENT_DONE:
      return action.payload;
      break;

    default:
      return state;
  }

};
