import _                              from 'lodash';
import banks                          from './banks';
// TODO:  this got deleted, remake it
// import { banksData, assessmentData }  from '../../../specs_support/dummy_data';

describe('banks reducer', () => {
  let state;
  let action;

  beforeEach(() => {
    state = undefined;
    action = {
      type    : null,
      payload : null,
    };
  });

  it('initializes with a empty state', () => {
    state = banks(state, action);
    expect(_.isEmpty(state)).toBeTruthy();
  });

  it('stores banks', () => {
    action.type = 'GET_BANKS_HIERARCHY_DONE';
    // action.payload = banksData;

    state = banks(state, action);

    expect(_.isEmpty(state)).toBeFalsy();
    expect(state['assessment.Bank%3A57e2b62fc89cd916208d0155%40ODL.MIT.EDU']).toBeDefined();
  });
});
