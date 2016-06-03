"use strict";

import wrapper    from "../constants/wrapper";

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  "LOAD_ACCOUNTS"
];

export const Constants = wrapper(actions, requests);

export function loadAccounts(){
  return {
    type: Constants.LOAD_ACCOUNTS,
    apiCall: true
  };
}