"use strict";

import wrapper    from "../constants/wrapper";

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  "LOAD_USERS",
  "RESET_USERS",
  "UPDATE_USER",
  "DELETE_USER",
  "CREATE_USER"
];

export const Constants = wrapper(actions, requests);

export function loadUsers(accountId, page){
  if(!page){
    page = 1;
  }
  const perPage = 100;
  return {
    type: Constants.LOAD_USERS,
    accountId,
    page,
    perPage,
    apiCall: true
  };
}

export function resetUsers(){
  return {
    type: Constants.RESET_USERS,
    apiCall: true
  };
}

export function updateUser(user){
  return {
    type: Constants.UPDATE_USER,
    user,
    apiCall: true
  };
}

export function deleteUser(user){
  return {
    type: Constants.DELETE_USER,
    user,
    apiCall: true
  };
}

export function createUser(accountId, user){
  return {
    type: Constants.CREATE_USER,
    accountId,
    user,
    apiCall: true
  };
}
