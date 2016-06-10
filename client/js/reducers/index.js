import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import assessment                       from './assessment';
import assessmentMetadata               from './assessment_metadata';
import progress                         from './progress';

const rootReducer = combineReducers({
  settings,
  application,
  assessment,
  assessmentMetadata,
  progress
});

export default rootReducer;
