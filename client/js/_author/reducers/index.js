import { combineReducers } from 'redux';
import settings            from './settings';
import application         from './application';
import jwt                 from './jwt';
import banks               from './banks';
import bankNavigation      from './bank_navigation';

const rootReducer = combineReducers({
  settings,
  jwt,
  application,
  banks,
  bankNavigation,
});

export default rootReducer;
