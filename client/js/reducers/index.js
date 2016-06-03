import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import assessment                       from './assessment';
import assessmentProgress               from './assessment_progress';

const rootReducer = combineReducers({
  settings,
  application,
  assessment,
  assessmentProgress
});

export default rootReducer;
