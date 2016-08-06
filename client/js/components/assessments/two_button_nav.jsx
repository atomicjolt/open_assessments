"use strict";

import React from "react";

import Button      from "../common/button";
import NextButton  from "./next_button";

export const SECONDARY_ACTION = {
  PREV : "PREV",
  NONE : "NONE"
};

export const PRIMARY_ACTION = {
  NEXT          : "NEXT",
  CHECK_ANSWERS : "CHECK_ANSWERS",
  SAVE_FILES    : "SAVE_FILES",
  SAVE_ANSWERS  : "SAVE_ANSWERS",
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

    // Function to be called when next button is clicked
    goToNextQuestions     : React.PropTypes.func.isRequired,

    // Function to be called when previous button is clicked
    goToPreviousQuestions : React.PropTypes.func.isRequired,

    // Function to be called when check answer button is clicked
    checkAnswers          : React.PropTypes.func.isRequired,

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
        return <NextButton />;

      case PRIMARY_ACTION.CHECK_ANSWERS:
        buttonProps.buttonClass += "c-btn--check-answer";
        buttonProps.buttonText = props.localizedStrings.checkAnswerButton;
        buttonProps.onClick = props.checkAnswers;
        break;

      case PRIMARY_ACTION.SAVE_FILES:
        buttonProps.buttonClass += "c-btn--check-answer";
        buttonProps.buttonText = props.localizedStrings.saveFileButton;
        buttonProps.onClick = props.checkAnswers;
        break;

      case PRIMARY_ACTION.SAVE_ANSWERS:
        buttonProps.buttonClass += "c-btn--check-answer";
        buttonProps.buttonText = props.localizedStrings.saveAnswerButton;
        buttonProps.onClick = props.checkAnswers;
        break;
    }

    if(props.primaryAction.spinner){
      buttonProps.buttonClass += " c-btn--loading";
      buttonContents.push(
        <svg key={buttonContents.length} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92">
          <path d="M46.1,82.3H41.9l-3.1-.3-3.8-.8-2.1-.7L31.7,80l-1.1-.5A35.7,35.7,0,0,1,21,73.7,37.8,37.8,0,0,1,7.6,49.1l-.2-2V41A32.7,32.7,0,0,1,8,36.8l.4-2.1c.1-.7.4-1.4.6-2a40.3,40.3,0,0,1,8.7-15,41,41,0,0,1,14.5-10l2.1-.8,2.1-.6a34.1,34.1,0,0,1,4.3-1L41.9,5h1.1l2.2-.2h6.3l2.2.3,2.1.4,2,.4,2,.6,2,.6,1.9.7,1.8.8a42.5,42.5,0,0,1,12.2,8.7,41.3,41.3,0,0,1,7.5,10.5l.7,1.3.5,1.3,1,2.4c.5,1.6.9,3.1,1.3,4.4l.7,3.7c.2,1.1.2,2,.3,2.8L90,46a7.5,7.5,0,1,1-15,1.2q0-.3,0-.6V44.5a17.6,17.6,0,0,0,0-1.8l-.2-2.5c-.2-.9-.4-1.9-.6-3.1l-.5-1.7-.3-.9-.4-.9a28.1,28.1,0,0,0-4.5-7.7,30.3,30.3,0,0,0-8.2-7l-1.3-.7-1.3-.7-1.4-.6-1.4-.5-1.5-.5-1.5-.4-1.4-.3-.7-.2h-.9l-1.9-.2H42a25,25,0,0,0-3.4.5l-1.7.3-1.7.5a32.8,32.8,0,0,0-12.2,6.9,33.5,33.5,0,0,0-8.2,11.8c-.2.6-.5,1.1-.7,1.7l-.5,1.7a27.4,27.4,0,0,0-.8,3.4l-.2.8v1l-.2,1.9v3.5a33.9,33.9,0,0,0,3.1,13.2A34.9,34.9,0,0,0,22.5,72a33.8,33.8,0,0,0,8.6,6.3l1,.6,1.1.4,2,.8,3.7,1.1,3,.6,2.3.3Z"/>
        </svg>
      );
    }

    return (
      <Button {...buttonProps}>
        {buttonContents}
      </Button>
    );
  }

  secondaryButton(props){
    if(props.secondaryAction.buttonState === SECONDARY_ACTION.PREV){
      return(
        <Button
          buttonClass="c-btn c-btn--previous"
          buttonText={props.localizedStrings.previousButton}
          onClick={props.goToPreviousQuestions}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
             <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
          </svg>
        </Button>
      );
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
