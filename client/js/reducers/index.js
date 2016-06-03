import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import messages                         from './messages';
import adminAccounts                    from './admin/accounts';
import adminNavigation                  from './admin/navigation';
import adminUsers                       from './admin/users';

const rootReducer = combineReducers({
  settings,
  application,
  messages,
  adminAccounts,
  adminNavigation,
  adminUsers
});

export default rootReducer;