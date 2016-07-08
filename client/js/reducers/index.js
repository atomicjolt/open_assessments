import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import assessment                       from './assessment';
import assessmentProgress               from './assessment_progress';
import jwt                              from './jwt';
import assessmentMeta                   from './assessment_meta';
import assessmentResults                from './assessment_results';

const rootReducer = combineReducers({
  settings,
  jwt,
  application,
  assessment,
  assessmentMeta,
  assessmentResults
});

export default rootReducer;
