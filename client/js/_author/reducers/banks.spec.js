import _                              from 'lodash';
import banks                          from './banks';

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
    action.payload = {
      childNodes: [{
        id: 'asdf2',
        childNodes: [{
          id: 'asdf3',
          childNodes: []
        }],
      },
      {
        id: 'asdf2.1',
        childNodes: [],
      }],
    };
    state = banks(state, action);

    expect(_.isEmpty(state)).toBeFalsy();
  });
});
