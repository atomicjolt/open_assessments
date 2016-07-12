import React                                  from 'react';
import ReactDOM                               from 'react-dom';
import TestUtils                              from 'react/lib/ReactTestUtils';

import { localizeStrings }                    from "../../selectors/localize";
import { SECONDARY_ACTION, PRIMARY_ACTION }   from "../assessments/two_button_nav";
import TwoButtonNav                           from "../assessments/two_button_nav";

describe('Two Button Nav', () => {

  describe('secondary action', () => {
    var result;
    var subject;
    var props;

    beforeEach(() => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        goToPreviousQuestions: () => {},
        secondaryAction: SECONDARY_ACTION.PREV
      };
    });

    var render = () => {
      result = TestUtils.renderIntoDocument(<TwoButtonNav {...props}/>);
      subject = ReactDOM.findDOMNode(result);
    };

    it('renders previous button when enabled', () => {
      render();

      expect(subject.innerHTML).toContain('Previous');
    });

    it('does not render previous button when not enabled', () => {
      props.secondaryAction = SECONDARY_ACTION.NONE;
      render();

      expect(subject.innerHTML).not.toContain('Previous');
    });
    it('calls onClick when previous button clicked', () => {
      spyOn(props, 'goToPreviousQuestions');
      render();
      var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--previous');
      TestUtils.Simulate.click(button);

      expect(props.goToPreviousQuestions).toHaveBeenCalled();
    });
  });

  describe('primary action ', () => {
    var result;
    var subject;
    var props;

    beforeEach(() => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
      };
    });

    var render = () => {
      result = TestUtils.renderIntoDocument(<TwoButtonNav {...props}/>);
      subject = ReactDOM.findDOMNode(result);
    };

    it('renders next button when enabled', () => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        goToNextQuestions: () => {},
        primaryAction: PRIMARY_ACTION.NEXT
      };
      render();

      expect(subject.innerHTML).toContain('Next');
    });

    it('calls onClick when next button is clicked', () => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        goToNextQuestions: () => {},
        primaryAction: PRIMARY_ACTION.NEXT
      };
      spyOn(props, 'goToNextQuestions');
      render();
      var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--next');
      TestUtils.Simulate.click(button);

      expect(props.goToNextQuestions).toHaveBeenCalled();
    });

    it('renders submit button when enabled', () => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        submitAssessment: () => {},
        primaryAction: PRIMARY_ACTION.SUBMIT
      };
      render();

      expect(subject.innerHTML).toContain('Finish Quiz');
    });

    it('calls onClick when submit button is clicked', () => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        submitAssessment: () => {},
        primaryAction: PRIMARY_ACTION.SUBMIT
      };
      spyOn(props, 'submitAssessment');
      render();
      var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--finish');
      TestUtils.Simulate.click(button);

      expect(props.submitAssessment).toHaveBeenCalled();
    });

    it('renders check answer button when enabled', () => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        checkAnswers: () => {},
        primaryAction: PRIMARY_ACTION.CHECK_ANSWERS
      };
      render();

      expect(subject.innerHTML).toContain('Check Answer');
    });

    it('calls onClick when answer button is clicked', () => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        checkAnswers: () => {},
        primaryAction: PRIMARY_ACTION.CHECK_ANSWERS
      };
      spyOn(props, 'checkAnswers');
      render();
      var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--check-answer');
      TestUtils.Simulate.click(button);

      expect(props.checkAnswers).toHaveBeenCalled();
    });
  });
});
