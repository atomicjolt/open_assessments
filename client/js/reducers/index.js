import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import assessment                       from './assessment';
import progress                         from './progress';
import jwt                              from './jwt';

const rootReducer = combineReducers({
  settings,
  jwt,
  application,
  assessment,
  progress
});

export default rootReducer;
