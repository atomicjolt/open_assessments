"use strict";

import React                                  from "react";


export default class AssessmentNav extends React.Component{

  static propTypes = {
    assessmentKind: React.PropTypes.string.isRequired,
    isFirstPage: React.PropTypes.bool.isRequired,
    isLastPage: React.PropTypes.bool.isRequired,
    nextQuestions: React.PropTypes.func.isRequired,
    previousQuestions: React.PropTypes.func.isRequired
  };


  getNextButton() {
    var nextButton = (
      <a
        className="c-btn c-btn--next"
        onClick={(e) => { this.props.nextQuestions(e); }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
		      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
			  </svg>
         <span>Next</span>
      </a>
    );

    if(this.props.isLastPage){
      nextButton = (
        <a className="c-btn c-btn--finish">
		       <span>Submit</span>
	       </a>
      );
    }

    return nextButton;
  }

  getPreviousButton() {
    var buttonStyle = 'c-btn--previous';
    if(this.props.isFirstPage){buttonStyle = 'c-btn--hide';} // Hide previous button on first page
    return (
      <a
        className={`c-btn ${buttonStyle}`}
        onClick={(e) => { this.props.previousQuestions(e); }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
			    <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
		    </svg>
        <span>Previous</span>
      </a>
    );


  }

  // getSubmitButton(){
  //   let submitButton;
  //   if(this.isLastPage() &&  this.props.settings.assessmentKind === "SUMMATIVE"){
  //     submitButton = (
  //       <div>
  //         <button
  //           className="btn btn-check-answer"
  //           onClick={(e)=>{this.submitButtonClicked(e);}}>
  //           Submit
  //         </button>
  //       </div>
  //     );
  //   }
  //   return submitButton;
  // }

  render(){

    return (
      <div className="c-assessment-navigation">
        {this.getPreviousButton()}
        {this.getNextButton()}
        {/* this.getSubmitButton() */}
     </div>
    );
  }

};
