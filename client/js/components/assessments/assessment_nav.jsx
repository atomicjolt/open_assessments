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
    let disabled = this.props.isLastPage;
    return (
      <button
        className="c-btn c-btn--next"
        onClick={(e) => { this.props.nextQuestions(e); }}
        disabled={disabled}>
        <span>Next</span> <i className="glyphicon glyphicon-chevron-right"></i>
      </button>
    );
  }

  getPreviousButton() {
    let disabled = this.props.isFirstPage;
    return (
      <button
        className="c-btn c-btn--previous"
        onClick={(e) => { this.props.previousQuestions(e); }}
        disabled={disabled}>
        <i className="glyphicon glyphicon-chevron-left"></i><span>Previous</span>
      </button>
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
