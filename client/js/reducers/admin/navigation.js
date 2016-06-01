import Immutable                            from 'immutable';
import _                                    from 'lodash';
import { Constants as AccountConstants }    from '../actions/admin/accounts';

const initialState = Immutable.fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case AccountConstants.LOAD_ACCOUNTS:
      return Immutable.fromJS(assessments);
      break;
    default:
      return state;
  }

};