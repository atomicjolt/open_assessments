import _        from 'lodash';
import request  from './middleware_request';

// import the map of constants that maps methods and urls for the appropriate backend.
// import callMap       from './rails';
// import callMap       from './oea';
import callMap          from './qbank';

const API = store => next => (action) => {
  if (action.method) {
    request(store, action, action.method, action.url, action.params, action.body);
  } else if (action.apiCall) {
    const handler = callMap[action.type];
    if (_.isFunction(handler)) {
      handler(store, action);
    } else if (_.isObject(handler)) {
      const state = store.getState();
      const { api_url, lambda_url } = state.settings;
      const url = action.type === 'GET_BANKS_HIERARCHY' ? lambda_url : api_url;
      request(
        store,
        action,
        handler.method,
        handler.url(url, action),
        handler.params ? handler.params(action) : action.params,
        handler.body ? handler.body(action) : action.body,
        handler.timeout ? handler.timeout : action.timeout,
      );
    } else {
      throw `No handler implemented for ${action.type}`;
    }
  }

  // call the next middleWare
  next(action);
};

export { API as default };
