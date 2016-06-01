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

export function resetUsersStore(){
  return {
    type: Constants.RESET_USERS,
  };
}

export function getUserData(payload){
  Dispatcher.dispatch({action: Constants.LOADING_USER_DATA, userList: payload.userList});
}

export function setCurrentSelectedUser(payload){
  Dispatcher.dispatch({action: Constants.LOADING_SELECTED_USER_DATA, currentSelectedUser: payload.currentSelectedUser});
}

export function updateUser(accountID, userID, payload){
  Dispatcher.dispatch({action: Constants.USER_UPDATING});
  Api.put(Constants.USER_UPDATED, "api/accounts/"+ accountID + "/users/" + userID, payload);
}

export function addToSelectedUsers(payload){
  Dispatcher.dispatch({action: Constants.ADD_USER, payload: payload});
}

export function removeFromSelectedUsers(payload){
  Dispatcher.dispatch({action: Constants.REMOVE_USER, payload: payload});
}

// export function deleteUsers(payload){
//   for(var i=0; i<payload.length; i++){
//     var url = "api/accounts/" + payload[i].account_id + "/users/" + payload[i].id;
//     Dispatcher.dispatch({action: Constants.DELETING_USERS});
//     Api.del(Constants.DELETE_USERS, url);
//   }
//   this.loadUsers(payload[0].account_id, 1);
// }

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