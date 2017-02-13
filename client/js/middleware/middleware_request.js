import api from '../libs/api';
import { DONE } from '../constants/wrapper';

export default function request(store, action, method, url, params, body) {
  const state = store.getState();

  const promise = api.execRequest(
    method,
    url,
    state.settings.api_url,
    state.jwt,
    state.settings.csrf_token,
    params,
    body
  );

  if (promise) {
    promise.then(
      (response) => {
        store.dispatch({
          type: action.type + DONE,
          payload: response.body,
          original: action,
          response,
        }); // Dispatch the new data
      },
      (error) => {
        store.dispatch({
          type: action.type + DONE,
          payload: {},
          original: action,
          error,
        }); // Dispatch the new error
      },
    );
  }
}
