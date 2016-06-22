"use strict";
import Immutable                             from "immutable";
import { Constants as AssessmentConstants }  from "../actions/assessment";

const initialState = Immutable.fromJS({});

export default (state = initialState, action) => {

  switch(action.type){

    case AssessmentConstants.LOAD_ASSESSMENT_DONE:
      return Immutable.fromJS(action.payload);
      break;

    default:
      return state;
  }

};
