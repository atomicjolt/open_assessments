"use strict";

import Immutable                             from 'immutable';
import _                                     from "lodash";
import { Constants as AssessmentConstants }  from "../actions/assessment";

const initialState = Immutable.fromJS({});

export default (state = initialState, action) => {

  switch(action.type){

    case AssessmentConstants.LOAD_ASSESSMENT_DONE:
      var assessment_data = action.payload.assessment_data;

      if(assessment_data){
        return Immutable.fromJS(assessment_data);
      } else {
        return state;
      }
      break;

    default:
      return state;
  }
}