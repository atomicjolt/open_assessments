import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import assessment                       from './assessment';
import assessmentProgress               from './assessment_progress';
import locale                           from './locale';
import jwt                              from './jwt';
import assessmentMeta                   from './assessment_meta';
import assessmentResults                from './assessment_results';

const rootReducer = combineReducers({
  settings,
  jwt,
  application,
  assessment,
  assessmentProgress,
  assessmentMeta,
  assessmentResults,
  locale
});

export default rootReducer;
