"use strict";

import React from "react";

import Button from "../common/button";

export const SECONDARY_ACTION = {
  ENABLED  : "ENABLED",
  DISABLED : "DISABLED"
};

export const PRIMARY_ACTION = {
  NEXT         : "NEXT",
  CHECK_ANSWER : "CHECK_ANSWER",
  SUBMIT       : "SUBMIT"
};

export default class TwoButtonNav extends React.Component{

  static propTypes = {

    // Function to be called when next button is clicked
    goToNextQuestions     : React.PropTypes.func.isRequired,
    goToPreviousQuestions : React.PropTypes.func.isRequired,
    checkAnswers          : React.PropTypes.func.isRequired,
    submitAssessment      : React.PropTypes.func.isRequired,

    secondaryAction: React.PropTypes.string.isRequired,
    primaryAction: React.PropTypes.string.isRequired
  };


  render(){
    var secondaryButton;
    var primaryButton;

    if(this.props.secondaryAction === SECONDARY_ACTION.ENABLED){
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
    } else if(this.props.primaryAction === PRIMARY_ACTION.CHECK_ANSWER) {
      primaryButton = (
        <Button
          buttonType="check-answer"
          buttonText="check answer"
          onClick={this.props.checkAnswers} />
      );
    }

    return (
      <div className="c-assessment-navigation">
        {primaryButton}
        {secondaryButton}
      </div>
    );
  }
  };
