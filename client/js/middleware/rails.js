import api                                    from "../libs/api";
import { Network }                            from "../constants/network";
import { DONE }                               from "../constants/wrapper";
import { Constants as AdminUserConstants }    from "../actions/admin/users";
import { Constants as AdminAccountConstants } from "../actions/admin/users";

const API = store => next => action => {

  function doRequest(verb, url, params, body){
    const state = store.getState();
    const promise = api.execRequest(verb, url, state.settings.get("apiUrl"), state.settings.get("jwt"), state.settings.get("csrfToken"), params, body);
    if(promise){
      promise.then((response, error) => {
        store.dispatch({
          type:     action.type + DONE,
          payload:  response.body,
          original: action,
          response,
          error
        }); // Dispatch the new data
      });
    }
    return true;
  }

  function handleAccounts(){
    switch (action.type) {
      case AdminAccountConstants.LOAD_ACCOUNTS:
        return doRequest(Network.GET, `api/accounts`);
        break;
      default:
        return false;
    }
  }

  function handleUsers(){
    switch (action.type) {
      case AdminUserConstants.LOAD_USERS:
        return doRequest(Network.GET, `api/accounts/${action.accountId}/users?page=${action.page}&per_page=${action.perPage}`);
        break;
      case AdminUserConstants.UPDATE_USER:
        return doRequest(Network.PUT, `api/accounts/${action.user.account_id}/users/${action.user.id}`, {}, action.user);
        break;
      case AdminUserConstants.DELETE_USER:
        return doRequest(Network.DEL, `api/accounts/${action.user.account_id}/users/${action.user.id}`);
        break;
      case AdminUserConstants.CREATE_USER:
        return doRequest(Network.POST, `api/accounts/${action.accountId}/users`, {}, action.user);
        break;
      default:
        return false;
    }
  };

  if(action.apiCall){
    const handled = handleAccounts() || handleUsers();
    if(!handled){
      throw `No handler implemented for ${action.type}`;
    }
  }

  // call the next middleWare
  next(action);

};

export { API as default };
