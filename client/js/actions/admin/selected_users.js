"use strict";

import wrapper    from "../constants/wrapper";

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  "ADD_USER",
  "REMOVE_USER"
];

export const Constants = wrapper(actions, requests);

export function addToSelectedUsers(user){
  return {
    type: Constants.ADD_USER,
    user
  };
}

export function removeFromSelectedUsers(user){
  return {
    type: Constants.REMOVE_USER,
    user
  };
}