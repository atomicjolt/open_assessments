import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';

import AssessmentNav      from './assessment_nav';


var isFirstPage = false;
var isLastPage = false;
var nextQuestions = () => {};
var previousQuestions = () => {};
var submitAssessment = () => {};

var props = {};

var result;
var subject;

var resetProps = () => {
  props = {
    isFirstPage,
    isLastPage,
    nextQuestions,
    previousQuestions,
    submitAssessment
  };
};

describe('assessment navigation', () => {

  beforeEach(() => {
    resetProps();

    result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
    subject = ReactDOM.findDOMNode(result);
  });


  describe('previous button', () => {

    it('hides previous button on first page of items', () => {
      props.isFirstPage = true;
      result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
      subject = ReactDOM.findDOMNode(result);

      expect(subject.innerHTML).not.toContain('c-btn--previous');
      expect(subject.innerHTML).toContain('c-btn--next');
    });

    it('shows previous button after first page of items', () => {
      result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
      subject = ReactDOM.findDOMNode(result);

      expect(subject.innerHTML).toContain('c-btn--previous');
      expect(subject.innerHTML).toContain('c-btn--next');
    });

    it('calls previousQuestions when previous button clicked', () => {
      spyOn(props, "previousQuestions");
      result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
      var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--previous');
      TestUtils.Simulate.click(button);

      expect(props.previousQuestions).toHaveBeenCalled();
    });
  });

  describe('next button', () => {
    it('shows submit button on final page of items', () => {
      props.isLastPage = true;
      result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
      subject = ReactDOM.findDOMNode(result);
      expect(subject.innerHTML).toContain('c-btn--previous');
      expect(subject.innerHTML).toContain('c-btn--finish');
      expect(subject.innerHTML).not.toContain('c-btn--next');
    });

    it('shows next button otherwise', () => {
      result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
      subject = ReactDOM.findDOMNode(result);

      expect(subject.innerHTML).toContain('c-btn--previous');
      expect(subject.innerHTML).toContain('c-btn--next');
    });

    it('calls nextQuestions when next button clicked', () => {
      spyOn(props, "nextQuestions");
      result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
      var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--next');
      TestUtils.Simulate.click(button);
      expect(props.nextQuestions).toHaveBeenCalled();
    });

    it('calls submitAssessment when submit button clicked', () => {
      spyOn(props, "submitAssessment");
      props.isLastPage = true;
      result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
      var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--finish');
      TestUtils.Simulate.click(button);

      expect(props.submitAssessment).toHaveBeenCalled();
    });
  });
});
