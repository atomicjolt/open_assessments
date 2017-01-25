import _                from 'lodash';
import request          from './middleware_request';
import { DONE }         from '../../constants/wrapper';


// import the map of constants that maps methods and urls for the appropriate backend.
// import callMap       from './rails';
// import callMap       from './oea';
import callMap          from './qbank';

export default store => next => action => {
  if (action.method) {
    request(store, action, action.method, action.url, action.params, action.body);
  } else if (action.apiCall) {
    const handler = callMap[action.type];
    if (_.isFunction(handler)) {
      handler(store, action);
    } else if (_.isObject(handler)) {
      request(
        store,
        action,
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
