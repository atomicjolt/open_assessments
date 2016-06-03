import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';


const rootReducer = combineReducers({
  settings,
  application,
});

export default rootReducer;
