"use strict";

import React                                  from "react";
import { connect }                            from "react-redux";

import * as AssessmentActions                 from "../../actions/assessment";
import * as AssessmentProgress                from "../../actions/assessment_progress";
import appHistory                             from "../../history";
import Item                                   from "../assessments/item";
import Loading                                from "../assessments/loading";
import ProgressDropdown                       from "../common/progress_dropdown";
import {questionCount, questions, outcomes }  from "../../selectors/assessment";

const select = (state, props) => {
  return {
    settings             : state.settings,
    assessment           : state.assessment,
    progress             : state.progress,
    questionCount        : questionCount(state, props),
    allQuestions         : questions(state, props),
    outcomes             : outcomes(state, props)
  };
};

export class Assessment extends React.Component{

  componentWillMount(){
    if(this.props.progress.get('assessmentResult') != null){
      appHistory.push("assessment-result");
    }
  }

  componentDidMount(){
    // Trigger action to indicate the assessment was viewed
    this.props.assessmentViewed();
  }

  /**
   * Return an item for a given index in props.allQuestions
   */
  getItem(index){
    let props = this.props;
    if(props.questionCount === undefined || index >= props.questionCount || index < 0){
      return <div></div>;
    }
    return <Item
      assessment       = {props.assessment}
      settings         = {props.settings}
      question         = {props.allQuestions[index]}
      currentItemIndex = {index}
      questionCount    = {props.questionCount}
      messageIndex     = {-1 /*props.progress.get('answerMessageIndex')*/}
      allQuestions     = {props.allQuestions}
      studentAnswers   = {{/*this.props.studentAnswers*/}}
      confidenceLevels = {{/*this.props.settings.confidence_levels*/}}
      outcomes         = {props.outcomes}
      shouldShowFooter

      nextQuestionClicked = {() => {console.log("next");}}
      prevQuestionClicked = {() => {}}
      confidenceLevelClicked = {() => {}}
      submitButtonClicked = {() => {}}
      />;
  }

  /**
   * Returns an array of Items containing the question at
   * state.progress.currentItemIndex. The array will be of length
   * specified by props.settings.questions_per_section.
   */
  getItems(){
    let displayNum = this.props.settings.get('questions_per_section');
    let current = this.props.progress.get('currentItemIndex');
    let items = [];
    if(displayNum > 0 && displayNum < this.props.questionCount){
      let start = current / displayNum;
      for(let i = start; i < displayNum; i++){
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
    if(this.props.progress.get('isSubmitted')){
      return <Loading />;
    } else if(!this.props.questionCount) {
      return <Loading />;
    } else {
      return this.getItems();
    }
  }

  popup(){
    return "Don’t leave!\n If you leave now your quiz won't be scored, but it will still count as an attempt.\n\n If you want to skip a question or return to a previous question, stay on this quiz and then use the \"Progress\" drop-down menu";
  }

  checkProgress(current, total){
    return Math.floor(current/total * 100);
  }

  render(){
    if(this.props.settings.get("assessment_kind") === "SUMMATIVE"){
      window.onbeforeunload = this.popup;
    }

    let progressBar; //TODO add progress bar
    let titleText =  this.props.assessment.title;
    let content = this.getContent();
    return<div className="assessment">
      <div>{titleText}</div>
      {progressBar}
      <div className="section_list">
        <div className="section_container">
          {content}
        </div>
      </div>
    </div>;
  }

}

export default connect(select, {...AssessmentProgress})(Assessment);
