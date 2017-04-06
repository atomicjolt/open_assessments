import api                      from './api';
import Helper                   from '../../../specs_support/helper';
import { Constants as AssessmentConstants } from '../actions/assessment';

describe('assessment loader middleware', function() {

  Helper.mockAllAjax();

  it('implements Redux middleware interface', () => {
    const store = { getState: () => {} };
    const middleware = api(store);
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);

    expect(api.length).toBe(1);                     // api middleware takes one arg
    expect(typeof middleware).toBe("function");     // api middleware must return a function to handle next
    expect(middleware.length).toBe(1);              // next handler returned by api middleware must take one argument
    expect(typeof actionHandler).toBe("function");  // next handler must return a function to handle action
    expect(actionHandler.length).toBe(1);           // action handler must take one argument
  });

  it('passes action on to next middleware', () => {
    const store = { getState: () => {} };
    const action = {
      type: "TEST"
    };
    const nextHandler = api(store);
    const next = (actionPassed) => {
      expect(actionPassed).toBe(action);
    };
    const actionHandler = nextHandler(next);
    actionHandler(action);
  });

  it('loads the assessment using data in the page', () => {
    const action = {
      type: AssessmentConstants.LOAD_ASSESSMENT
    };
    const middleware = api(Helper.makeStore());
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);
    actionHandler(action);
  });

  it('loads the assessment from a url', () => {
    const action = {
      type: AssessmentConstants.LOAD_ASSESSMENT
    };
    const middleware = api(Helper.makeStore());
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);
    actionHandler(action);
  });

});
