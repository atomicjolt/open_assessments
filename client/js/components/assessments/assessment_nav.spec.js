import React         from 'react';
import ReactDOM      from 'react-dom';
import TestUtils     from 'react/lib/ReactTestUtils';

import { NAV_BUTTON_MODES } from './assessment_nav';
import AssessmentNav from './assessment_nav';


describe('Assessment Navigation', () => {
  describe('rendering buttons', () => {
    var result;
    beforeEach(() => {
      result = TestUtils.renderIntoDocument(<AssessmentNav />);
    });

    it('renders previous button', () => {
      var subject = TestUtils.renderIntoDocument(result.getPreviousButton());

      expect(subject.props.buttonType).toContain('previous');
      expect(subject.props.buttonText).toContain('Previous');
      expect(subject.props.children.type).toContain('svg');
    });

    it('renders next button', () => {
      var subject = TestUtils.renderIntoDocument(result.getNextButton());

      expect(subject.props.buttonType).toContain('next');
      expect(subject.props.buttonText).toContain('Next');
      expect(subject.props.children.type).toContain('svg');
    });

    it('renders submit button', () => {
      var subject = TestUtils.renderIntoDocument(result.getSubmitButton());

      expect(subject.props.buttonType).toContain('finish');
      expect(subject.props.buttonText).toContain('Submit');
    });
    it('renders check answer button', () => {
      var subject = TestUtils.renderIntoDocument(result.getCheckAnswerButton());

      expect(subject.props.buttonType).toContain('check-answer');
      expect(subject.props.buttonText).toContain('check answer');
    });
  });

  describe('button modes', () => {
    describe('two button mode', () => {
      var props;
      var result;
      var subject;

      var render = () => {
        result = TestUtils.renderIntoDocument(<AssessmentNav {...props} />);
        subject = ReactDOM.findDOMNode(result);
      };

      beforeEach(() => {
        props = {
          nextUnlocked:false,
          previousUnlocked:false,
          checkAnswerUnlocked:false,
          submitUnlocked:false,
          buttonMode:NAV_BUTTON_MODES.TWO_BUTTON
        };

      });

      it('always renders previous when enabled', () => {
        props.previousUnlocked = true;
        render();

        expect(subject.outerHTML).toContain("Previous");
      });

      it('does not render previous when not enabled', () => {
        render();

        expect(subject.outerHTML).not.toContain("Previous");
      });

      it('renders submit when enabled', () => {
        props.submitUnlocked = true;
        render();

        expect(subject.outerHTML).toContain("Submit");
      });

      it('renders next when enabled and submit is not enabled', () => {
        props.submitUnlocked = false;
        props.nextUnlocked = true;
        render();

        expect(subject.outerHTML).not.toContain("Submit");
        expect(subject.outerHTML).toContain("Next");
      });

      it('renders checkAnswers when submit and next are not enabled', () => {
        props.submitUnlocked = false;
        props.nextUnlocked = false;
        props.checkAnswerUnlocked = true;
        render();

        expect(subject.outerHTML).not.toContain("Submit");
        expect(subject.outerHTML).not.toContain("Next");
        expect(subject.outerHTML).toContain("check answer");
      });
    });
  });

});
