"use strict";

import React                                  from "react";
import { connect }                            from "react-redux";

import * as CommunicationActions              from "../../actions/communications";
import * as AssessmentProgress                from "../../actions/assessment_progress";
import appHistory                             from "../../history";
import Item                                   from "../assessments/item";
import Loading                                from "../assessments/loading";
import ProgressDropdown                       from "../common/progress_dropdown";
import {questionCount, questions, outcomes }  from "../../selectors/assessment";

const select = (state, props) => {
  return {
    settings             : state.settings.toJS(),
    assessment           : state.assessment,
    progress             : state.progress.toJS(),
    currentQuestion      : state.progress.get('currentItemIndex'),
    responses            : state.progress.get('responses').toJS(),
    questionCount        : questionCount(state, props),
    allQuestions         : questions(state, props),
    outcomes             : outcomes(state, props)
  };
};

export class Assessment extends React.Component{

  componentWillMount(){
    if(this.props.progress.assessmentResult != null){
      appHistory.push("assessment-result");
    }
  }

  componentDidMount(){
    // Trigger action to indicate the assessment was viewed
    this.props.assessmentViewed(this.props.settings, this.props.assessment);

    this.props.sendSize();
    this.props.scrollParentToTop();
    this.props.hideLMSNavigation();
  }

  componentDidUpdate() {
    this.props.sendSize();
    this.props.scrollParentToTop();
  }

  /**
   * Will check if assessment is completed and then dispatch submit assessment
   * action
   */
  submitAssessment(){
    var complete = this.checkCompletion();
    if(complete === true){
      window.onbeforeunload = null;
      this.props.submitAssessment(
        this.props.assessment.id,
        this.props.assessment.assessmentId,
        this.props.allQuestions,
        this.props.responses,
        this.props.settings,
        this.props.outcomes
      );
    } else {
      //TODO display some sort of warning message?
    }
  }

  /**
   * Returns true if all questions have been answered, false otherwise.
   */
  checkCompletion(){
    return true;
    //TODO calculate number of unanswered questions
    // var questionsNotAnswered = [];
    // var responses = this.props.responses;
    // for (var i = 0; i < answers.length; i++) {
    //   if(answers[i] == null || answers[i].length == 0){
    //     questionsNotAnswered.push(i+1);
    //   }
    // };
    // if(questionsNotAnswered.length > 0){
    //   return questionsNotAnswered;
    // }
    // return true;
  }

  /**
   * Return an item for a given index in props.allQuestions
   */
  getItem(index){
    let props = this.props;
    if(props.questionCount === undefined || index >= props.questionCount || index < 0){
      return <div></div>;
    }
    debugger;
    return <Item
      settings         = {props.settings}
      question         = {props.allQuestions[index]}
      response         = {props.responses[index]}
      currentItemIndex = {index}
      questionCount    = {props.questionCount}
      messageIndex     = {props.progress.answerMessageIndex[index]}
      allQuestions     = {props.allQuestions}
      outcomes         = {props.outcomes}
      goToNextQuestion = {() => {props.nextQuestion();}}
      goToPrevQuestion = {() => {props.previousQuestion();}}
      submitAssessment = {() => {this.submitAssessment();}}
      selectAnswer     = {
        (answerId) =>
          {this.props.answerSelected(index, answerId);}
      }
      />;
  }

  /**
   * Returns an array of Items containing the question at
   * state.progress.currentItemIndex. The array will be of length
   * specified by props.settings.questions_per_section.
   */
  getItems(){
    let displayNum = this.props.settings.questions_per_section;
    let current = this.props.progress.currentItemIndex;
    let items = [];
    if(displayNum > 0 && displayNum < this.props.questionCount){
      let start = current / displayNum;
      let end = start + displayNum;

      for(let i = start; i < end; i++){
        items.push(this.getItem(i));
      }
    } else {
      this.props.allQuestions.forEach((question, index) => {
        items.push(this.getItem(index));
      });
    }

    return items;
  }

  /**
   * Returns page content to be rendered. Will determine if questions
   * or loading bar should be rendered
   */
  getContent(){
    if(this.props.progress.isSubmitted){
      return <Loading />;
    } else if(!this.props.questionCount) {
      return <Loading />;
    } else {
      return this.getItems();
    }
  }

  /**
   * Returns true if the current question is the last question, false otherwise.
   */
  isLastQuestion(){
    return this.props.currentQuestion === this.props.questionCount - 1;
  }

/**
 * Returns a warning if there are unanswered questions and we are on the
 * last question.
 */
  getWarning(){
    let unanswered = this.checkCompletion();
    let warning;
    if(unanswered === true && this.isLastQuestion()){
      warning = <div>Warning There are unanswered questions</div>;
    }
    return warning;
  }

  popup(){
    return "Don’t leave!\n If you leave now your quiz won't be scored, but it will still count as an attempt.\n\n If you want to skip a question or return to a previous question, stay on this quiz and then use the \"Progress\" drop-down menu";
  }

  checkProgress(current, total){
    return Math.floor(current/total * 100);
  }

  render(){
    if(this.props.settings.assessment_kind === "SUMMATIVE"){
      window.onbeforeunload = this.popup;
    }

    let progressBar; //TODO add progress bar
    let titleText =  this.props.assessment.title;
    let content = this.getContent();
    let warning = this.getWarning();

    return<div className="assessment">
      <div>{titleText}</div>
      {progressBar}
      <div className="section_list">
        <div className="section_container">
          {warning}
          {content}
        </div>
      </div>
    </div>;
  }

}

export default connect(select, {...AssessmentProgress, ...CommunicationActions})(Assessment);
