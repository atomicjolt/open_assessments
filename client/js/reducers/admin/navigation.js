import Immutable                            from 'immutable';
import _                                    from 'lodash';
import { Constants as NavigationConstants } from '../actions/admin/navigation';

const initialState = Immutable.fromJS({ navStatus: true, mainTab: "" });

export default function(state = initialState, action) {
  switch (action.type) {
    case NavigationConstants.NAV_CHANGED:
      return state.set("navStatus", !state.get("navStatus"));
      break;
    case NavigationConstants.CHANGE_MAIN_TAB:
      return state.set("mainTab", action.mainTab);
      break;
    default:
      return state;
  }

};