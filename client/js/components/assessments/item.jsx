"use strict";

import React                  from "react";
import * as AssessmentActions from "../../actions/assessment";
import UniversalInput         from "./universal_input";

export default class Item extends React.Component{

  static propTypes = {
    question                   : React.PropTypes.object.isRequired,
    currentItemIndex           : React.PropTypes.number.isRequired,
    questionCount              : React.PropTypes.number.isRequired,
    messageIndex               : React.PropTypes.number.isRequired,
    confidenceLevels           : React.PropTypes.bool.isRequired,
    nextQuestion               : React.PropTypes.func.isRequired,
    prevQuestion               : React.PropTypes.func.isRequired,
    confidenceLevel            : React.PropTypes.func.isRequired,
    submitAssessment           : React.PropTypes.func.isRequired,
    outcomes                   : React.PropTypes.object,
  };

  nextButtonClicked(e){
    e.preventDefault();
    this.props.nextQuestion();
  }

  previousButtonClicked(e){
    e.preventDefault();
    this.props.prevQuestion();
  }

  // confidenceLevelClicked(e, currentItemIndex){
    // e.preventDefault();
    //
    // if(this.props.selectedAnswerId && this.props.selectedAnswerId.length > 0){
    //   AssessmentActions.selectConfidenceLevel(e.target.value, currentItemIndex);
    //   if(this.props.currentItemIndex == this.props.questionCount - 1 && this.props.settings.assessmentKind.toUpperCase() == "FORMATIVE"){
    //     this.submitButtonClicked();
    //   } else {
    //     AssessmentActions.nextQuestion();
    //     this.setState({showMessage: false});
    //   }
    // } else {
    //   this.setState({showMessage: true});
    // }
    // if(document.getElementById("focus")){document.getElementById("focus").focus();}
  // }

  submitButtonClicked(e){
    e.preventDefault();
    // AssessmentActions.selectQuestion(this.props.currentItemIndex); TODO
    this.props.submitAssessment();
  }

  // getFooterNav(){
  //   if(this.props.shouldShowFooter){
  //   return <div>
  //           <button onClick={(e)=>{this.previousButtonClicked(e);}}>
  //           <i className="glyphicon glyphicon-chevron-left"></i>
  //           Previous
  //           </button>
  //           <button onClick={(e)=>{this.nextButtonClicked(e);}}>
  //             Next
  //             <i className="glyphicon glyphicon-chevron-right"></i>
  //           </button>
  //         </div>;
  //   }
  //   return "";
  // }



  // getConfidenceLevels(level){
  //   if(level){
  //     var levelMessage = <div><b>How sure are you of your answer? Click below to move forward.</b></div>;
  //     return <div className="confidence_wrapper">
  //               {levelMessage}
  //               <input type="button" className="btn btn-check-answer" value="Just A Guess" onClick={(e) => { this.confidenceLevelClicked(e, this.props.currentItemIndex); }}/>
  //               <input type="button" className="btn btn-check-answer" value="Pretty Sure" onClick={(e) => { this.confidenceLevelClicked(e, this.props.currentItemIndex); }}/>
  //               <input type="button" className="btn btn-check-answer" value="Very Sure" onClick={(e) => { this.confidenceLevelClicked(e, this.props.currentItemIndex); }}/>
  //             </div>
  //   } /*else {
  //     return <div className="lower_level"><input type="button" className="btn btn-check-answer" value="Check Answer" onClick={() => { AssessmentActions.checkAnswer()}}/></div>
  //   }*/
  // }

  getNavigationButtons() {
    return <div className="confidence_wrapper">
              {this.getPreviousButton()}
              {this.getNextButton()}
            </div>;
  }

  getNextButton() {
    let disabled = (this.props.currentItemIndex == this.props.questionCount - 1);
    return (
        <button
          onClick={(e) => { this.nextButtonClicked(e); }}
          disabled={disabled}
        >
          <span>Next</span> <i className="glyphicon glyphicon-chevron-right"></i>
        </button>);
  }

  getPreviousButton() {
    let disabled = (this.props.currentItemIndex === 0);
    return (
        <button
          onClick={(e) => { this.previousButtonClicked(e); }}
          disabled={disabled}
        >
          <i className="glyphicon glyphicon-chevron-left"></i><span>Previous</span>
        </button>);
  }

  getSubmitButton(){
    let submitButton = "";
    if(this.props.currentItemIndex == this.props.questionCount - 1 &&
        this.props.assessment_kind === "SUMMATIVE"){
      submitButton = <div>
                      <button
                        className="btn btn-check-answer"
                        onClick={(e)=>{this.submitButtonClicked(e);}}
                      >
                        Submit
                      </button>
                    </div>;
    }
    return submitButton;
  }

  getCounter(){
    if(this.props.shouldShowCounter){
      return <span className="counter">
              {this.props.currentItemIndex + 1} of {this.props.questionCount}
             </span>;
    }
    return;
  }

  getResult(index){
    var result;

    if(index == CORRECT_RESPONSE){
      result = <div className="check_answer_result">
                  <p>Correct</p>
               </div>;
    } else if(index == INCORRECT_RESPONSE) {
      result = <div className="check_answer_result">
                <p>Incorrect</p>
               </div>;
    } else {
      result = <div className="check_answer_result">
                <p></p>
               </div>;
    }

    return result;
  }


  render() {
    var result = this.getResult(this.props.messageIndex);
    var must_answer_message = this.state && this.state.showMessage ? <div>You must select an answer before continuing.</div> : "";
    var navigation = this.getNavigationButtons();

    var counter = this.getCounter();
    let submitButton = this.getSubmitButton();

    var questionDirections = "";
    if(this.props.question.question_type == "multiple_answers_question"){
      questionDirections =
        <div>Choose <b>ALL</b> that apply.</div>;
    } else {
      questionDirections =
        <div>Choose the <b>BEST</b> answer.</div>;
    }

    return (
      <div className="assessment_container">
        <div className="question">
          <div className="header">
                {counter}
            <p>{this.props.question.title}</p>
          </div>
          <div>
            <form className="edit_item">
              <div className="full_question" tabIndex="0">
                <div className="inner_question">
                  <div className="question_text">
                    {questionDirections}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.props.question.material
                      }}>
                    </div>
                  </div>
                  <UniversalInput item={this.props.question} isResult={false}/>
                </div>
                <div className="row">
                  <div className="col-md-5 col-sm-6 col-xs-8" >
                    {result}
                    {navigation}
                    {must_answer_message}
                  </div>
                  <div className="col-md-7 col-sm-6 col-xs-4">
                    {submitButton}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export const CORRECT_RESPONSE = 1;
export const INCORRECT_RESPONSE = 2;
