import React                                  from 'react';
import TestUtils                              from 'react-addons-test-utils';
import ReactDOM                               from 'react-dom';
import { Provider }                           from 'react-redux';

import localizeStrings                        from '../../selectors/localize';
import configureStore                         from '../../store/configure_store';
import { SECONDARY_ACTION, PRIMARY_ACTION }   from '../assessments/two_button_nav';
import TwoButtonNav                           from '../assessments/two_button_nav';


describe('Two Button Nav', () => {

  describe('secondary action', () => {
    var result;
    var subject;
    var props;

    beforeEach(() => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        goToPreviousQuestions: () => {},
        submitAssessment: () => {},
        secondaryAction: {buttonState: SECONDARY_ACTION.PREV},
        primaryAction: '',
      };
    });

    var render = () => {
      result = TestUtils.renderIntoDocument(
        <Provider store={configureStore()}>
          <TwoButtonNav {...props} />
        </Provider>
      );
      subject = ReactDOM.findDOMNode(result);
    };

    it('renders previous button when enabled', () => {
      render();

      expect(subject.innerHTML).toContain('Previous');
    });

    it('does not render previous button when not enabled', () => {
      props.secondaryAction = {buttonState: SECONDARY_ACTION.NONE};
      render();

      expect(subject.innerHTML).not.toContain('Previous');
    });
  });

  describe('primary action ', () => {
    var result;
    var subject;
    var props;

    beforeEach(() => {
      props = {
        localizedStrings: localizeStrings({settings:{locale:"en"}}).twoButtonNav,
        secondaryAction: {},
        goToNextQuestions: () => {},
        submitAssessment: () => {},
        checkAnswers: () => {}
      };
    });

    var render = () => {
      result = TestUtils.renderIntoDocument(
        <Provider store={configureStore()}>
          <TwoButtonNav {...props} />
        </Provider>
      );
      subject = ReactDOM.findDOMNode(result);
    };

    it('renders next button when enabled', () => {
      props.primaryAction = PRIMARY_ACTION.NEXT;
      render();

      expect(subject.innerHTML).toContain('Next');
    });

    it('renders submit button when enabled', () => {
      props.primaryAction = PRIMARY_ACTION.SUBMIT;
      render();

      expect(subject.innerHTML).toContain('Finish');
    });

    it('calls onClick when submit button is clicked', () => {
      props.primaryAction = PRIMARY_ACTION.SUBMIT;
      spyOn(props, 'submitAssessment');
      render();
      var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--finish');
      TestUtils.Simulate.click(button);

      expect(props.submitAssessment).toHaveBeenCalled();
    });

    it('renders check answer button when enabled', () => {
      props.primaryAction = PRIMARY_ACTION.CHECK_ANSWERS;
      render();

      expect(subject.innerHTML).toContain("c-btn--check-answer");
    });
  });
});
