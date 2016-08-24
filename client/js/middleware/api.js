import api              from "../libs/api";
import { DONE }         from "../constants/wrapper";

// import the map of constants that maps methods and urls for the appropriate backend.
// import callMap       from "./rails";
// import callMap       from "./oea";
import ApiCallMap       from "./qbank";
import AnalyticsCallMap from "./qbank_analytics";

const handler = (callMap, required = true) => {
  return store => next => action => {

    function request(method, url, params, body){
      const state = store.getState();
      const promise = api.execRequest(method, url, state.settings.api_url, state.jwt, state.settings.csrf_token, params, body);
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
      if(_.isFunction(handler)){
        handler(store, action);
      } else if(_.isObject(handler)){
        request(
          handler.method,
          handler.url(action),
          handler.params ? handler.params(params) : action.params,
          handler.body ? handler.body(action) : action.body
        );
      } else if(required) {
        throw `No handler implemented for ${action.type}`;
      }

    }

    // call the next middleWare
    next(action);
  };
};


export const analyticsHandler = handler(AnalyticsCallMap, false);
export const apiHandler = handler(ApiCallMap, true);
