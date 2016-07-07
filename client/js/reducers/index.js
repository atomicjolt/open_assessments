import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import assessment                       from './assessment';
import assessmentProgress               from './assessment_progress';
import jwt                              from './jwt';
import assessmentMeta                   from './assessment_meta';

const rootReducer = combineReducers({
  settings,
  jwt,
  application,
  assessment,
  assessmentProgress,
  assessmentMeta
});

export default rootReducer;
