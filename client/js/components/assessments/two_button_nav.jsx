"use strict";

import React from "react";

import Button       from "../common/button";
import CheckButton  from "./check_button";
import NextButton   from "./next_button";
import PrevButton   from "./prev_button";

export const SECONDARY_ACTION = {
  PREV : "PREV",
  NONE : "NONE"
};

export const PRIMARY_ACTION = {
  NEXT          : "NEXT",
  CHECK_ANSWERS : "CHECK_ANSWERS",
  SUBMIT        : "SUBMIT"
};


/**
 * Component to display two button style nav. Will render two buttons, primary
 * button and secondary button. Primary button will be displayed in one of three
 * states: "next questions", "check answer", or "submit asessment". Secondary button
 * will either render previous questions button, or nothing at all if no
 * previous questions are available.
 */
export default class TwoButtonNav extends React.Component{

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
     * Object containing the state of the nav primary action button
     * in the form {spinner: boolean, buttonState: PRIMARY_ACTION[*]}
     * Where buttonState is the current state of the primary button
     * e.g.(PRIMARY_ACTION.NEXT, PRIMARY_ACTION.SUBMIT), and spinner
     * is whether or not a spinner should be applied to the button.
     */
    primaryAction         : React.PropTypes.object.isRequired, //Maybe accept object?

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings      : React.PropTypes.object.isRequired
  };


  primaryButton(props){
    var buttonProps = {
      buttonClass: "c-btn ",
      buttonText: "",
      onClick:() => {},
    };
    var buttonContents = [];
    switch (props.primaryAction.buttonState) {
      case PRIMARY_ACTION.SUBMIT:
        buttonProps.buttonClass += "c-btn--finish";
        buttonProps.buttonText = props.localizedStrings.submitButton;
        buttonProps.onClick = props.submitAssessment;
        break;

      case PRIMARY_ACTION.NEXT:
        return <NextButton/>;

      case PRIMARY_ACTION.CHECK_ANSWERS:
        return <CheckButton/>;
    }

    return (
      <Button {...buttonProps}>
        {buttonContents}
      </Button>
    );
  }

  secondaryButton(props){
    if(props.secondaryAction.buttonState === SECONDARY_ACTION.PREV){
      return <PrevButton/>;
    }
  }

  render(){
    return (
      <div className="c-assessment-navigation">
        <div className="c-button-slot">
          {this.secondaryButton(this.props)}
        </div>
        <div className="c-button-slot">
          {this.primaryButton(this.props)}
        </div>
      </div>
    );
  }
};
