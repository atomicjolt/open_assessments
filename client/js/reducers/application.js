"use strict";

import Immutable  from "immutable";

const initialState = Immutable.fromJS({ assessmentIsStarted: false, theme: {} });

export default (state = initialState, action) => {

  switch(action.type){

    default:
      return state;
  }

};