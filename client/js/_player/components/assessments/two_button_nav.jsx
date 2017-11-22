import React from 'react';

import Button                      from '../common/button';
import CheckButton                 from './check_button';
import { NextButton, PrevButton }  from './nav_buttons';

export const SECONDARY_ACTION = {
  PREV : 'PREV',
  NONE : 'NONE'
};

export const PRIMARY_ACTION = {
  NEXT          : 'NEXT',
  CHECK_ANSWERS : 'CHECK_ANSWERS',
  SUBMIT        : 'SUBMIT'
};


/**
 * Component to display two button style nav. Will render two buttons, primary
 * button and secondary button. Primary button will be displayed in one of three
 * states: 'next questions', 'check answer', or 'submit asessment'. Secondary button
 * will either render previous questions button, or nothing at all if no
 * previous questions are available.
 */
export default class TwoButtonNav extends React.Component {

  static propTypes = {

    // Function to be called when submit button is clicked
    submitAssessment      : React.PropTypes.func.isRequired,

    /**
     * Object containing the state of the nav secondary action button
     * in the form {buttonState: PRIMARY_ACTION[*]}
     * Where buttonState is the current state of the secondary button.
     * e.g.(SECONDARY_ACTION.NONE, SECONDARY_ACTION.PREV).
     */
    secondaryAction       : React.PropTypes.object.isRequired,

    /**
     * The current state of the primary button e.g.(PRIMARY_ACTION.NEXT,
     * PRIMARY_ACTION.SUBMIT).
     */
    primaryAction         : React.PropTypes.string.isRequired,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings      : React.PropTypes.object.isRequired
  };


  primaryButton(props) {
    switch (props.primaryAction) {
      case PRIMARY_ACTION.NEXT:
        return <NextButton />;

      case PRIMARY_ACTION.CHECK_ANSWERS:
        return <CheckButton />;

      case PRIMARY_ACTION.SUBMIT:
        return (<Button
          buttonClass="c-btn c-btn--finish"
          buttonText={props.localizedStrings.submitButton}
          onClick={props.submitAssessment}
        />);
      default:
        break;
    }
  }

  secondaryButton(props) {
    if (props.secondaryAction.buttonState === SECONDARY_ACTION.PREV) {
      return <PrevButton />;
    }
  }

  render() {
    return (
      <nav className="c-assessment-navigation" aria-label="question">
        <div className="c-button-slot">
          {this.primaryButton(this.props)}
        </div>
        <div className="c-button-slot">
          {this.secondaryButton(this.props)}
        </div>
      </nav>
    );
  }
}
