import api         from "../libs/api";
import { DONE }    from "../constants/wrapper";

// import the map of constants to calling methods from the appropriate backend.
// import callMap     from "./rails";
import callMap     from "./oea";

const ApiMap = store => next => action => {

  function request(method, url, params, body){
    const state = store.getState();
    const promise = api.execRequest(method, url, state.settings.get("apiUrl"), state.settings.get("jwt"), state.settings.get("csrfToken"), params, body);
    promise.then((response, error) => {
      store.dispatch({
        type:     action.type + DONE,
        payload:  response.body,
        original: action,
        response,
        error
      }); // Dispatch the new data
    });
  };

  if(action.apiCall){
    const handled = handleAssessment() || handleJwt();
    if(!handled){
      throw `No handler implemented for ${action.type}`;
    }
  }

  // call the next middleWare
  next(action);

};

export { ApiMap as default };
