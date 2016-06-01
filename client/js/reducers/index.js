import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import messages                         from './messages';
import accounts                         from './admin/accounts';

const rootReducer = combineReducers({
  settings,
  application,
  messages,
  accounts
});

export default rootReducer;