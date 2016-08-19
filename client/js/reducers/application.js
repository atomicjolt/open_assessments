"use strict";
import { Constants } from "../actions/application";

const initialState =  {};

export default (state = initialState, action) => {
  switch(action.type){
    case Constants.APP_DISPLAY_ERROR:
      return {
        error: action.error,
        error_message: action.message
      };
    default:
      return state;
  }
};
