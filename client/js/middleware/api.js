import api         from "../libs/api";
import { DONE }    from "../constants/wrapper";

// import the map of constants that maps methods and urls for the appropriate backend.
// import callMap     from "./rails";
import callMap     from "./oea";

const API = store => next => action => {

  function request(method, url, params, body){
    const state = store.getState();
    const promise = api.execRequest(method, url, state.settings.get("apiUrl"), state.settings.get("jwt"), state.settings.get("csrfToken"), params, body);
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
  };

  if(action.method){
    request(action.method, action.url, action.params, action.body);
  } else if(action.apiCall){
    const handler = callMap[action.type];
    if(handler){
      request(
        handler.method,
        handler.url(action),
        handler.params ? handler.params(params) : action.params,
        handler.body ? handler.body(action) : action.body
      );
    } else {
      throw `No handler implemented for ${action.type}`;
    }
  }

  // call the next middleWare
  next(action);

};

export { API as default };
