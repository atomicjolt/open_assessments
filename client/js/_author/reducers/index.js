import { combineReducers } from 'redux';
import settings            from './settings';
import application         from './application';
import jwt                 from './jwt';
import banks               from './banks';

const rootReducer = combineReducers({
  settings,
  jwt,
  application,
  banks,
});

export default rootReducer;
