import Immutable                            from 'immutable';
import _                                    from 'lodash';
import { Constants as UserConstants }       from '../../actions/admin/users';
import { DONE }                             from "../../constants/wrapper";

const initialState = Immutable.fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case UserConstants.LOAD_USERS:
      const users = _.reduce(action.payload, (user, users) => {
        return users[user.id] = user;
      }, {});
      return Immutable.fromJS(users);
      break;

    case UserConstants.CREATED_USER:
    case UserConstants.UPDATE_USER:
      const user = action.payload;
      return state.set(`${user.id}`, user);
      break;

    case UserConstants.RESET_USERS:
      return Immutable.fromJS({});

    case UserConstants.DELETE_USER:
      return state.delete(`${action.userId}`);

    case UserConstants.DELETE_USER + DONE:
      // Check for failure. If user couldn't be deleted put the user back and inform the browser.
      const user = action.payload;
      return state.delete(user.id);

    default:
      return state;
  }

};