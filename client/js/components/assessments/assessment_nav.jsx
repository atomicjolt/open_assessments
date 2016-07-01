"use strict";

import React from "react";

import Button from "../common/button";

export const NAV_BUTTON_MODES = {
  TWO_BUTTON:"TWO_BUTTON"
};

export default class AssessmentNav extends React.Component{

  static propTypes = {
    nextQuestions: React.PropTypes.func.isRequired,
    previousQuestions: React.PropTypes.func.isRequired,
    submitAssessment: React.PropTypes.func.isRequired,
    checkAnswers: React.PropTypes.func.isRequired,

    nextUnlocked: React.PropTypes.bool.isRequired,
    previousUnlocked: React.PropTypes.bool.isRequired,
    checkAnswerUnlocked: React.PropTypes.bool.isRequired,
    submitButtonUnlocked: React.PropTypes.bool.isRequired,

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

    /*
     * Two button mode selects between next, submit, and check answer buttons for
     * the right button.
     */
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
