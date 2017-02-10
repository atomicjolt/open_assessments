import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../specs_support/stub';
import Header             from './bank_list_header';

describe('Bank List Header', () => {
  let result;
  let props;
  let sortVal;

  beforeEach(() => {
    sortVal = null;
    props = {
      sortBy: (val) => { sortVal = val; },
    };

    result = TestUtils.renderIntoDocument(<Stub><Header {...props} /></Stub>);
  });

  it('sorts by name', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[0]);
    expect(sortVal).toBe('sortName');
  });

  it('sorts by published', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[1]);
    expect(sortVal).toBe('sortPublished');
  });

  it('activates name', () => {
    props.sortName = 'asc';
    result = TestUtils.renderIntoDocument(<Stub><Header {...props} /></Stub>);
    const active = TestUtils.scryRenderedDOMComponentsWithClass(result, 'is-active');
    expect(active.length).toBe(2);
  });

  it('activates name and published', () => {
    props.sortName = 'asc';
    props.sortPublished = 'desc';
    result = TestUtils.renderIntoDocument(<Stub><Header {...props} /></Stub>);
    const active = TestUtils.scryRenderedDOMComponentsWithClass(result, 'is-active');
    expect(active.length).toBe(4);
  });

});
