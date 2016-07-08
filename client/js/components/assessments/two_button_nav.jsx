"use strict";

import React from "react";

import Button from "../common/button";

export const SECONDARY_ACTION = {
  PREV : "PREV",
  NONE : "NONE"
};

export const PRIMARY_ACTION = {
  NEXT          : "NEXT",
  CHECK_ANSWERS : "CHECK_ANSWERS",
  SUBMIT        : "SUBMIT",
  SPINNER       : "SPINNER"
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

    // The state of the secondary action button. Should be a value included in
    // SECONDARY_ACTION.
    secondaryAction: React.PropTypes.string.isRequired,

    // The state of the primary action button. Should be a value included in
    // PRIMARY_ACTION.
    primaryAction: React.PropTypes.string.isRequired
  };


  render(){
    var secondaryButton;
    var primaryButton;

    if(this.props.secondaryAction === SECONDARY_ACTION.PREV){
      secondaryButton = (
        <Button
          buttonType="previous"
          buttonText="Previous"
          onClick={this.props.goToPreviousQuestions}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
             <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
          </svg>
        </Button>
      );
    }

    if(this.props.primaryAction === PRIMARY_ACTION.SUBMIT){
      primaryButton = (
         <Button
           buttonType="finish"
           buttonText="Submit"
           onClick={this.props.submitAssessment} />
      );
    } else if(this.props.primaryAction === PRIMARY_ACTION.NEXT) {
      primaryButton = (
        <Button
          buttonType="next"
          buttonText="Next"
          onClick={this.props.goToNextQuestions}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
             <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
          </svg>
        </Button>
      );
    } else if(this.props.primaryAction === PRIMARY_ACTION.CHECK_ANSWERS) {
      primaryButton = (
        <Button
          buttonType="check-answer"
          buttonText="Check Answer"
          onClick={this.props.checkAnswers} />
      );
    } else if(this.props.primaryAction === PRIMARY_ACTION.SPINNER){
      primaryButton = <div>So Spinny</div>;
    }

    return (
      <div className="c-assessment-navigation">
        {secondaryButton}
        {primaryButton}
      </div>
    );
  }
};
