"use strict";

import {Constants}  from "../actions/locale";


const initialState = "en";

export default (state=initialState, action) => {

  switch(action.type) {

    case Constants.LOCALE_SET:
      return action.locale;
      break;

    default:
      return state;
  }
};
