import React      from 'react';
import ReactDOM   from 'react-dom';
import TestUtils  from 'react/lib/ReactTestUtils';

import NextButton from './next_button';

describe('next button', () => {

  it('shows submit button on final page of items', () => {
    var result = TestUtils.renderIntoDocument(
      <NextButton isLastPage={true} />);
    var subject = ReactDOM.findDOMNode(result);
    expect(subject.outerHTML).toContain('c-btn--finish');
    expect(subject.outerHTML).not.toContain('c-btn--next');
  });

  it('shows next button otherwise', () => {
    var result = TestUtils.renderIntoDocument(<NextButton />);
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.outerHTML).toContain('c-btn--next');
  });

  it('calls nextQuestions when next button clicked', () => {
    var props = {
      nextQuestions:() => {}
    };
    spyOn(props, "nextQuestions");
    var result = TestUtils.renderIntoDocument(<NextButton {...props} />);
    var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--next');
    TestUtils.Simulate.click(button);

    expect(props.nextQuestions).toHaveBeenCalled();
  });

  it('calls submitAssessment when submit button clicked', () => {
    var props = {
      submitAssessment:() => {},
      isLastPage:true
    };
    spyOn(props, "submitAssessment");
    var result = TestUtils.renderIntoDocument(<NextButton {...props} />);
    var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--finish');
    TestUtils.Simulate.click(button);

    expect(props.submitAssessment).toHaveBeenCalled();
  });
});
