"use strict";

import wrapper    from "../constants/wrapper";

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  "NAV_CHANGED",
  "CHANGE_MAIN_TAB"
];

export const Constants = wrapper(actions, requests);

export function changeNav(){
  return {
    type: Constants.NAV_CHANGED,
  };
}

export function changeMainTab(payload){
  return {
    type: Constants.NAV_CHANGED,
  };

  Dispatcher.dispatch({ action: Constants.CHANGE_MAIN_TAB_PENDING, mainTab: payload.text });
}