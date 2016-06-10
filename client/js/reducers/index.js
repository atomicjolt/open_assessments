import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import assessment                       from './assessment';
import progress                         from './progress';

const rootReducer = combineReducers({
  settings,
  application,
  assessment,
  progress
});

export default rootReducer;
