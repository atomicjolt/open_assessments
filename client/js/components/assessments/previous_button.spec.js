import React      from 'react';
import ReactDOM   from 'react-dom';
import TestUtils  from 'react/lib/ReactTestUtils';

import PreviousButton from './previous_button';

describe('next button', () => {
  it('hides previous button on first page of items', () => {
    var result = TestUtils.renderIntoDocument(<PreviousButton isFirstPage={true} />);
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.outerHTML).not.toContain('c-btn--previous');
  });

  it('shows previous button after first page of items', () => {
    var result = TestUtils.renderIntoDocument(<PreviousButton />);
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.outerHTML).toContain('c-btn--previous');
  });

  it('calls previousQuestions when previous button clicked', () => {
    var props = {
      previousQuestions:() => {}
    };
    spyOn(props, "previousQuestions");
    var result = TestUtils.renderIntoDocument(<PreviousButton {...props} />);
    var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--previous');
    TestUtils.Simulate.click(button);

    expect(props.previousQuestions).toHaveBeenCalled();
  });
});
