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
    let v = this.props.progress.get('assessmentResult');
    debugger;
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
  item(index){
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
      outcomes         = {props.outcomes}/>;
  }

  /**
   * Gets correct number of items for the current view setting
   */
  items(){
    let view = this.props.settings.get('view');
    let current = this.props.progress.get('currentItemIndex');
    let cont;
    switch(view){
      case "SHOW_ONE":
        cont = this.item(current);
        break;
      default:
        cont = this.item(current);
        break;
    };
    return cont;
  }

  /**
   * Returns page content to be rendered. Will determine if questions
   * or loading bar should be rendered
   */
  content(){
    if(this.props.progress.get('isSubmitted')){
      return <Loading />;
    }
    else {
      return this.items();
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

    let progressBar; //TODO
    let titleText =  this.props.assessment.get("title", "");

    return<div className="assessment">
      <div>{titleText}</div>
      {progressBar}
      <div className="section_list">
        <div className="section_container">
          {this.content()}
        </div>
      </div>
    </div>;
  }

}

export default connect(select, {...AssessmentProgress})(Assessment);
