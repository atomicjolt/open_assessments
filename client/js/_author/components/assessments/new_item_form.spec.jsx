import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import NewItem    from './new_item_form';

describe('New Item Form', () => {
  let result;
  let props;
  let called;

  beforeEach(() => {
    called = null;
    props = {
      cancel: () => { called = 'cancel'; },
      create: (state) => { called = state; },
    };

    result = TestUtils.renderIntoDocument(<NewItem {...props} />);
  });

  it('calls cancel when cancelled', () => {
    const button = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-btn--gray',
    );
    TestUtils.Simulate.click(button);
    expect(called).toBe('cancel');
  });

  it('sets default settings on new assessments', () => {
    const button = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-btn--maroon',
    );
    TestUtils.Simulate.click(button);
    expect(called.type).toBeDefined();
    expect(called.type).toBe('multipleChoice');
    expect(called.name).toBe('');
    expect(called.language).toBe('639-2%3AENG%40ISO');
  });

  it('sets name on new assessments', () => {
    const input = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-text-input',
    );
    const button = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-btn--maroon',
    );
    TestUtils.Simulate.change(input, { target: { value: 'tacos' } });
    TestUtils.Simulate.click(button);
    expect(called.name).toBe('tacos');
  });

  it('sets type on new assessments', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'select')[0];
    const button = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-btn--maroon',
    );
    TestUtils.Simulate.change(input, { target: { value: 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU' } });
    TestUtils.Simulate.click(button);
    expect(called.type).toBe('item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU');
  });
});
