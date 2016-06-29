import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import AssessmentNav      from './assessment_nav';


var isFirstPage = false;
var isLastPage = false;
var nextQuestions = () => {};
var previousQuestions = () => {};

var props;

var result;
var subject;

var resetProps = () => {
  props = {
    isFirstPage,
    isLastPage,
    nextQuestions,
    previousQuestions
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
  });
});
