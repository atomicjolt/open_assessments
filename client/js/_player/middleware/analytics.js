import _                from 'lodash'
import request          from './middleware_request';
import callMap          from './qbank_analytics';

export default store => next => action => {
  if (action.method) {
    request(store, action, action.method, action.url, action.params, action.body);
  } else {
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
    }
  }

  // call the next middleWare
  next(action);
};
