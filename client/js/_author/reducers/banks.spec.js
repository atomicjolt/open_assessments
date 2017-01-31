import _                              from 'lodash';
import banks                          from './banks';
// TODO:  this got deleted, remake it
// import { banksData, assessmentData }  from '../../../specs_support/dummy_data';

xdescribe('banks reducer', () => {
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
    action.type = 'GET_BANKS_DONE';
    // action.payload = banksData;

    state = banks(state, action);

    expect(_.isEmpty(state)).toBeFalsy();
    expect(state['assessment.Bank%3A57e2b62fc89cd916208d0155%40ODL.MIT.EDU']).toBeDefined();
  });

  it('stores assessments under the bank', () => {
    action.type = 'GET_BANKS_DONE';
    // action.payload = banksData;
    state = banks(state, action);

    action.type = 'GET_BANK_CHILDREN_DONE';
    // action.payload = assessmentData;
    // state = banks(state, action);
    expect(state['assessment.Bank%3A57867b0dc89cd93f9e22cc2f%40ODL.MIT.EDU'].assessments).toBeDefined();
  });
});
