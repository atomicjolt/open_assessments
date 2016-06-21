"use strict";

import React                  from "react";
import * as AssessmentActions from "../../actions/assessment";
import UniversalInput         from "./universal_input";

export default class Item extends React.Component{

  static propTypes = {
    question         : React.PropTypes.object.isRequired,
    currentItemIndex : React.PropTypes.number.isRequired,
    questionCount    : React.PropTypes.number.isRequired,
    messageIndex     : React.PropTypes.number.isRequired,
    confidenceLevels : React.PropTypes.bool.isRequired,
    outcomes         : React.PropTypes.object
  };

  nextButtonClicked(e){
    e.preventDefault();
    this.setState({unAnsweredQuestions: null});
    AssessmentActions.nextQuestion();
    this.setState({showMessage: false});
  }

  previousButtonClicked(e){
    e.preventDefault();
    this.setState({unAnsweredQuestions: null});
    AssessmentActions.previousQuestion();
    this.setState({showMessage: false});
  }

  confidenceLevelClicked(e, currentItemIndex){
    e.preventDefault();

    if(this.props.selectedAnswerId && this.props.selectedAnswerId.length > 0){
      AssessmentActions.selectConfidenceLevel(e.target.value, currentItemIndex);
      if(this.props.currentItemIndex == this.props.questionCount - 1 && this.props.settings.assessmentKind.toUpperCase() == "FORMATIVE"){
        this.submitButtonClicked();
      } else {
        AssessmentActions.nextQuestion();
        this.setState({showMessage: false});
      }
    } else {
      this.setState({showMessage: true});
    }
    if(document.getElementById("focus")){document.getElementById("focus").focus();}
  }

  submitButtonClicked(e){
    e && e.preventDefault();
    AssessmentActions.selectQuestion(this.props.currentItemIndex);
    var complete = this.checkCompletion();
    if(complete === true){
      window.onbeforeunload = null;
      AssessmentActions.submitAssessment(this.props.assessment.id, this.props.assessment.assessmentId, this.props.allQuestions, this.props.allStudentAnswers, this.props.settings, this.props.outcomes);
    }
    else {
      this.setState({unAnsweredQuestions: complete});
    }
  }

  checkCompletion(){
    var questionsNotAnswered = [];
    var answers = this.props.allStudentAnswers;
    for (var i = 0; i < answers.length; i++) {
      if(answers[i] == null || answers[i].length == 0){

        questionsNotAnswered.push(i+1);
      }
    };
    if(questionsNotAnswered.length > 0){
      return questionsNotAnswered;
    }
    return true;
  }

  getFooterNav(){
    if(this.props.shouldShowFooter){
      return <div>
              <button onClick={()=>{this.previousButtonClicked();}}>
              <i className="glyphicon glyphicon-chevron-left"></i>
              Previous
              </button>
              <button onClick={()=>{this.nextButtonClicked();}}>
                Next
                <i className="glyphicon glyphicon-chevron-right"></i>
              </button>
            </div>;
    }

    return "";
  }

  getWarning(state, questionCount, questionIndex){
    if(state && state.unAnsweredQuestions && state.unAnsweredQuestions.length > 0 && questionIndex + 1 == questionCount){
      return <div><i className="glyphicon glyphicon-exclamation-sign"></i> You left question(s) {state.unAnsweredQuestions.join()} blank. Use the "Progress" drop-down menu at the top to go back and answer the question(s), then come back and submit.</div>
    }

    return "";
  }

  getConfidenceLevels(level){
    if(level){
      var levelMessage = <div style={{marginBottom: "10px"}}><b>How sure are you of your answer? Click below to move forward.</b></div>;
      return    (<div className="confidence_wrapper">
                  {levelMessage}
                  <input type="button" className="btn btn-check-answer" value="Just A Guess" onClick={(e) => { this.confidenceLevelClicked(e, this.props.currentItemIndex) }}/>
                  <input type="button" className="btn btn-check-answer" value="Pretty Sure" onClick={(e) => { this.confidenceLevelClicked(e, this.props.currentItemIndex) }}/>
                  <input type="button" className="btn btn-check-answer" value="Very Sure" onClick={(e) => { this.confidenceLevelClicked(e, this.props.currentItemIndex) }}/>
                </div>
                );
    } /*else {
      return <div className="lower_level"><input type="button" className="btn btn-check-answer" value="Check Answer" onClick={() => { AssessmentActions.checkAnswer()}}/></div>
    }*/
  }

  getNavigationButtons() {
    if (!this.props.shouldShowNextPrevious && this.props.confidenceLevels) {
      return "";
    }

    return <div className="confidence_wrapper">
      {this.getPreviousButton()}
      {this.getNextButton()}
    </div>
  }

  getNextButton() {
    var disabled = (this.props.currentItemIndex == this.props.questionCount - 1) ? "disabled" : "";
    return (
        <button className={"btn btn-next-item " + disabled} onClick={(e) => { this.nextButtonClicked(e); }}>
          <span>Next</span> <i className="glyphicon glyphicon-chevron-right"></i>
        </button>);
  }

  getPreviousButton() {
    var prevButtonClassName = "btn btn-prev-item " + ((this.props.currentItemIndex > 0) ? "" : "disabled");
    return (
        <button className={prevButtonClassName} onClick={(e) => { this.previousButtonClicked(e); }}>
          <i className="glyphicon glyphicon-chevron-left"></i><span>Previous</span>
        </button>);
  }


  getResult(index){
    var result;

    if(index == -1){
      result = <div className="check_answer_result">
                <p></p>
              </div>;
    }
    else if(index == 0){
    result = <div className="check_answer_result">
                <p>Incorrect</p>
              </div>;
    }
    else {
      result =  <div className="check_answer_result">
                  <p>Correct</p>
                </div>;
    }

    return result;
  }


  render() {
    var unAnsweredWarning = this.getWarning(this.state, this.props.questionCount, this.props.currentItemIndex);
    var result = this.getResult(this.props.messageIndex);
    var must_answer_message = this.state && this.state.showMessage ? <div>You must select an answer before continuing.</div> : "";
    var confidenceButtons = this.getConfidenceLevels(this.props.confidenceLevels);
    var submitButton = (this.props.currentItemIndex == this.props.questionCount - 1) ? <button className="btn btn-check-answer" onClick={(e)=>{this.submitButtonClicked(e)}}>Submit</button> : "";
    var footer = this.getFooterNav();
    var navigationDiv = this.getNavigationButtons();

    //Check if we need to display the counter in the top right
    var counter = "";

    if(this.props.shouldShowCenter){
      counter = <span className="counter">{this.props.currentItemIndex + 1} of {this.props.questionCount}</span>
    }
    var formativeHeader = "";
    if(this.props.settings.assessmentKind.toUpperCase() == "FORMATIVE"){
      formativeHeader =
          <div>
            <div className="row">
            </div>
            <div className="row">
              <div className="col-md-10">
                <h4>{this.props.assessment.title}</h4>
              </div>
              <div className="col-md-2">
              </div>
            </div>
          </div>
    }

    var formativeStyle = this.props.settings.assessmentKind.toUpperCase() == "FORMATIVE" ? {padding: "20px"} : {};
    var submitButtonDiv =  <div>
                          {submitButton}
                        </div>;

    if(this.props.settings.assessmentKind.toUpperCase() == "FORMATIVE"){
      submitButtonDiv = ""
    }

    var questionDirections = "";
    if(this.props.question.question_type == "multiple_answers_question"){
      questionDirections =
      <div>Choose <b>ALL</b> that apply.</div>
    }
    else {
      questionDirections =
      <div>Choose the <b>BEST</b> answer.</div>
    }

    return (
      <div className="assessment_container">
        <div className="question">
          <div className="header">
                {counter}
            <p>{this.props.question.title}</p>
          </div>
          <div style={formativeStyle}>
            {formativeHeader}
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
                    {confidenceButtons}
                    {navigationDiv}
                    {unAnsweredWarning}
                    {must_answer_message}
                  </div>
                  <div className="col-md-7 col-sm-6 col-xs-4">
                    {submitButtonDiv}
                  </div>
                </div>
              </div>
            </form>
          </div>
          {footer}
        </div>
      </div>
    );
  }

}
