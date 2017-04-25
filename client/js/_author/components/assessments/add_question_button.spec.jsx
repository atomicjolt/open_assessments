import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import Stub         from '../../../../specs_support/stub';
import AddQuestion  from './add_question_button';

describe('Add Question Button', () => {
  let result;
  let props;
  let called;

  beforeEach(() => {
    called = false;
    props = {
      newItem: () => { called = true; }
    };
    result = TestUtils.renderIntoDocument(<Stub><AddQuestion {...props} /></Stub>);
  });

  it('adds a new item', () => {
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'au-c-question-add__button');
    TestUtils.Simulate.click(button);
    expect(called).toBeTruthy();
  });
});
