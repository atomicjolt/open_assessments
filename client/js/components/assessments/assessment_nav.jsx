"use strict";

import React from "react";

import Button from "../common/button";

export const NAV_BUTTON_MODES = {
  TWO_BUTTON:"TWO_BUTTON"
};

export default class AssessmentNav extends React.Component{

  static propTypes = {

    // Function to be called when next button is clicked
    nextQuestions: React.PropTypes.func.isRequired,

    // Function to be called when previous button is clicked
    previousQuestions: React.PropTypes.func.isRequired,

    // Function to be called when submit button is clicked
    submitAssessment: React.PropTypes.func.isRequired,

    // Function to be called when check answer button is clicked
    checkAnswers: React.PropTypes.func.isRequired,

    // Whether or not the next set of questions is available to the user
    nextUnlocked: React.PropTypes.bool.isRequired,

    // Whether or not the previous set of questions is available to the user
    previousUnlocked: React.PropTypes.bool.isRequired,

    // Whether or not the check answer button is available to the user
    checkAnswerUnlocked: React.PropTypes.bool.isRequired,

    // Whether or not the submit button is available to the user
    submitButtonUnlocked: React.PropTypes.bool.isRequired,

    // The button configuration to be displayed. Should be one of
    // NAV_BUTTON_MODES.
    buttonMode: React.PropTypes.string.isRequired
  };


  getPreviousButton(){
    return (
      <Button
        buttonType="previous"
        buttonText="Previous"
        onClick={this.props.previousQuestions}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
           <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
        </svg>
      </Button>
    );
  }

  getNextButton(){
    return (
      <Button
        buttonType="next"
        buttonText="Next"
        onClick={this.props.nextQuestions}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
           <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
        </svg>
      </Button>
    );
  }


  getSubmitButton(){
    return (
     <Button
       buttonType="finish"
       buttonText="Submit"
       onClick={this.props.submitAssessment} />
    );
  }

  getCheckAnswerButton(){
    return (
      <Button
        buttonType="check-answer"
        buttonText="check answer"
        onClick={this.props.checkAnswers} />
    );
  }
  getTwoButton(buttonMap){
    var buttons = [];


    // Two button mode always renders previous button as left button if enabled
    if(buttonMap.previous === true){buttons.push(this.getPreviousButton());}


    // Two button mode selects between next, submit, and check answer buttons for
    // the right button.

    if(buttonMap.submit === true){
      buttons.push(this.getSubmitButton());
    } else if(buttonMap.next === true) {
      buttons.push(this.getNextButton());
    } else {
      buttons.push(this.getCheckAnswerButton());
    }

    return buttons;
  }

  getButtons(buttonMode, buttonMap){
    if(buttonMode === NAV_BUTTON_MODES.TWO_BUTTON){
      return this.getTwoButton(buttonMap);
    }
  }

  render(){
    var buttonMap = {
      previous: this.props.previousUnlocked,
      next: this.props.nextUnlocked,
      submit: this.props.submitUnlocked,
      checkAnswer: this.props.checkAnswerUnlocked
    };

    return (
      <div className="c-assessment-navigation">
        {this.getButtons(this.props.buttonMode, buttonMap)}
      </div>
    );
  }
  };
