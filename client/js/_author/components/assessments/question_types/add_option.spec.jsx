import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import AddOption  from './add_option';
import Stub       from '../../../../../specs_support/stub'

describe('Update Choice working', () => {
  let result;
  let props;
  let called = false

  beforeEach(() => {
    props = {
      updateChoice: () => called = !called,
    };

    result = TestUtils.renderIntoDocument(<Stub><AddOption {...props} /></Stub>);
  });

  it('updates choice', () => {
    const div = TestUtils.findRenderedDOMComponentWithClass(result, 'c-answer c-answer--add');
    TestUtils.Simulate.click(div);
    expect(called).toBeTruthy();
  });
});
