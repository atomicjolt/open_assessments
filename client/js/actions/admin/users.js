"use strict";

import wrapper    from "../constants/wrapper";

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  "LOAD_USERS",
  "RESET_USERS"
];

export const Constants = wrapper(actions, requests);

export function loadUsers(accountId, page){
  if(!page){
    page = 1;
  }
  const perPage = 100;
  return {
    type: Constants.LOAD_USERS,
    method: Network.GET,
    url: `api/accounts/${accountId}/users?page=${page}&per_page=${perPage}`
  };

}

export function updateUser(accountId, userId, user){
  return {
    type: Constants.UPDATE_USER,
    method: Network.PUT,
    url: `api/accounts/${accountId}/users/${userId}`,
    body: user
  }
}

export function deleteUser(user){
  var url = "api/accounts/" + user.account_id + "/users/" + user.id;
  Dispatcher.dispatch({action: Constants.DELETING_USERS});
  Api.del(Constants.DELETE_USERS, url);
}

export function createUser(accountId, payload){
  Dispatcher.dispatch({action: Constants.CREATING_USER});
  Api.post(Constants.CREATED_USER, '/api/accounts/'+ accountId +'/users', payload);
}
};