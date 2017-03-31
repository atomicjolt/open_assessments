import api                              from './api';
import Network                          from '../../constants/network';
import Helper                           from '../../../specs_support/helper';
import * as AssessmentActions           from '../actions/assessment';
import * as AssessmentMetaActions       from '../actions/assessment_meta';
import * as AssessmentProgressActions   from '../actions/assessment_progress';
import * as CommunicationsActions       from '../actions/communications';
import * as JwtActions                  from '../../actions/jwt';
import _                                from 'lodash';

describe('api middleware', () => {
  Helper.mockAllAjax();

  it('implements Redux middleware interface', () => {
    const store = { getState: () => {} };
    const middleware = api(store);
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);

    // api middleware takes one arg
    expect(api.length).toBe(1);
    // api middleware must return a function to handle next
    expect(typeof middleware).toBe('function');
    // next handler returned by api middleware must take one argument
    expect(middleware.length).toBe(1);
    // next handler must return a function to handle action
    expect(typeof actionHandler).toBe('function');
    // action handler must take one argument
    expect(actionHandler.length).toBe(1);
  });

  it('passes action on to next middleware', () => {
    const store = { getState: () => {} };
    const action = {
      type: 'TEST',
    };
    const nextHandler = api(store);
    const next = (actionPassed) => {
      expect(actionPassed).toBe(action);
    };
    const actionHandler = nextHandler(next);
    actionHandler(action);
  });

  it('calls the api library', () => {
    const action = {
      type: 'TEST',
      method: Network.GET,
      url: 'http://www.example.com/api/stuff.json',
    };
    const middleware = api(Helper.makeStore());
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);
    actionHandler(action);
  });

  it("throws an exception if the constant isn't handled", () => {
    const middleware = api(Helper.makeStore());
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);
    const actionType = "NOT_HANDLED";
    const action = {
      type: actionType,
      apiCall: true
    };
    expect(() => { actionHandler(action); }).toThrow(`No handler implemented for ${actionType}`);
  });

  it("handles known actions", () => {
    const middleware = api(Helper.makeStore());
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);
    const actions = {
      ...JwtActions,
      ...AssessmentActions,
      ...AssessmentMetaActions,
      ...AssessmentProgressActions,
      ...CommunicationsActions
    };
    const apiActions = _.filter(actions, _.isFunction);
    _.each(apiActions, (func) => {
      const action = func();
      if(action.apiCall){
        actionHandler(action);
      }
    });
  });
});
