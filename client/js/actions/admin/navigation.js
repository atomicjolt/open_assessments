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
    type: Constants.NAV_CHANGED
  };
}

export function changeMainTab(mainTab){
  return {
    type: Constants.CHANGE_MAIN_TAB,
    mainTab
  };
}