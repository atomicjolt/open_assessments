import _ from 'lodash';

export function dispatchMany(actions, store) {
  _.each(actions, action => store.dispatch(action));
}
