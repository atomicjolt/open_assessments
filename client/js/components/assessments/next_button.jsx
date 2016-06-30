"use strict";

import React from "react";

export default class NextButton extends React.Component{

  static propTypes = {
    // Whether or not the current page of items is the last page of items
    isLastPage: React.PropTypes.bool.isRequired,

    // Function to be called when submit button is clicked
    submitAssessment: React.PropTypes.func.isRequired,
  };

  getNextButton(){
    return (
      <a
        className="c-btn c-btn--next"
        onClick={(e) => { this.props.nextQuestions(e); }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  	      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
  		  </svg>
         <span>Next</span>
      </a>
    );
  }

  getSubmitButton(){
    return (
      <a
        className="c-btn c-btn--finish"
        onClick={(e) => {this.props.submitAssessment(e);}}>
        <span>Submit</span>
      </a>
    );
  }

  render(){
    var nextButton = this.getNextButton();
    if(this.props.isLastPage === true){nextButton = this.getSubmitButton();}

    return nextButton;
  }
  };
