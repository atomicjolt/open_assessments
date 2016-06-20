"use strict";

import React                                  from "react";
import { connect }                            from "react-redux";

import AssessmentActions                      from "../../actions/assessment";
import appHistory                             from "../../history";
import Item                                   from "../assessments/item";
import Loading                                from "../assessments/loading";
import ProgressDropdown                       from "../common/progress_dropdown";
import { questionCount, questions, outcomes } from "../../selectors/assessment";

const select = (state, props) => {
  return {
    settings             : state.settings,
    assessment           : state.assessment,
    progress             : state.progress,
    // isStarted            : state.progress.get('isStarted'),
    // isSubmitted          : state.progress.get('isSubmitted'),
    // question             : state.progress.get('currentQuestion'),
    // currentItemIndex     : state.progress.get('currentItemIndex'),
    // assessmentResult     : state.progress.get('assessmentResult'),
    // messageIndex         : state.progress.get('answerMessageIndex'),
    // studentAnswers       : state.progress.get('allStudentAnswers'),
    questionCount        : questionCount(state, props),
    allQuestions         : questions(state, props),
    outcomes             : outcomes(state, props)
  };
};

// NOTE Multiple question views --> show 1, show all, show sections
// NOTE Start progress timer
// NOTE Progress bar

export class Assessment extends React.Component{

  componentWillMount(){
    if(this.props.assessmentResult != null){
      appHistory.push("assessment-result");
    }
  }

  componentDidMount(){
    // Trigger action to indicate the assessment was viewed
    // this.props.assessmentViewed(this.props.settings, this.props.assessment); TODO
  }

  items(){
    let view = this.props.settings.get('view');
    let cont = <div></div>;
    switch(view){
      case "SHOW_ONE":
        break;
      case "SHOW_THREE":
        break;
      case "SHOW_SECTION":
        break;
    };
    return cont;
  }

  popup(){
    return "Don’t leave!\n If you leave now your quiz won't be scored, but it will still count as an attempt.\n\n If you want to skip a question or return to a previous question, stay on this quiz and then use the \"Progress\" drop-down menu";
  }

  checkProgress(current, total){
    return Math.floor(current/total * 100);
  }

  render(){
    console.log(this.props);
    debugger;
    window.onbeforeunload = this.popup;
    // // if(AssessmentStore.assessmentResult() != null || this.props.settings.assessment_type.toUpperCase() != "SUMMATIVE"){
    //   // window.onbeforeunload = null;
    // // }

    var showStart = this.props.settings.enable_start && !this.props.assessment.isStarted;
    var content;
    var progressBar;
    var titleBar;

    if(this.props.isSubmitted){
      content = <Loading />;
    }
    // else if(showStart){
    //
    //   content = <CheckUnderstanding
    //     title           = {this.props.assessment.title}
    //     name            = {this.props.question.name}
    //     maxAttempts     = {this.props.settings.allowed_attempts}
    //     userAttempts    = {this.props.settings.user_attempts}
    //     eid             = {this.props.settings.lis_user_id}
    //     isLti           = {this.props.settings.is_lti}
    //     assessmentId    = {this.props.assessment.assessment_id}
    //     assessmentKind  = {this.props.settings.assessment_type}
    //     primaryOutcome  = {this.props.outcomes[0]}
    //     ltiRole         = {this.props.settings.lti_role}
    //     icon            = {this.props.settings.images.quiz_icon_svg}/>;
    //
    //   //TODO progress bar sytles
    //   progressBar = <div>
    //                   {progressText}
    //                   <ProgressDropdown disabled={true} questions={this.props.allQuestions} currentQuestion={this.props.currentItemIndex + 1} questionCount={this.props.questionCount} />
    //                 </div>;
    //
    // }
    // else {
    content = <Item
      question         = {this.props.question}
      assessment       = {this.props.assessment}
      currentItemIndex = {this.props.currentItemIndex}
      settings         = {this.props.settings}
      questionCount    = {this.props.questionCount}
      assessmentResult = {this.props.assessmentResult}
      messageIndex     = {this.props.messageIndex}
      allQuestions     = {this.props.allQuestions}
      studentAnswers   = {this.props.studentAnswers}
      confidenceLevels = {this.props.settings.confidence_levels}
      outcomes         = {this.props.outcomes}/>;

      //TODO progress bar styles
    // progressBar = <div>
    //                 {progressText}
    //                 <ProgressDropdown settings={this.props.settings} questions={this.props.allQuestions} currentQuestion={this.props.currentItemIndex + 1} questionCount={this.props.questionCount} />
    //               </div>;
    // // TODO figure out when to mark an item as viewed. assessmentResult must be valid before this call is made.
    //   // AssessmentActions.itemViewed(this.props.settings, this.props.assessment, this.props.assessmentResult);
    // }

    var isSummative = false; // this.props.settings.assessment_type.toUpperCase() === "SUMMATIVE";

    var percentCompleted = this.checkProgress(this.props.currentItemIndex, this.props.questionCount);
    var progressStyle = {width:percentCompleted+"%"};
    var progressText = "";
    var quizType = isSummative ? "Quiz" : "Show What You Know";
    var titleBar = isSummative ? <div>{this.props.assessment ? this.props.assessment.title : ""}</div> : "";
    if(this.props.assessment){
      progressText = this.props.settings.shouldShowProgressText ? <div><b>{this.props.assessment.title + " Progress"}</b>{" - You are on question " + (this.props.currentItemIndex + 1) + " of " + this.props.questionCount}</div> : "";
    }
    progressBar = isSummative ? progressBar : "";
    return<div className="assessment">
      {titleBar}
      {progressBar}
      <div className="section_list">
        <div className="section_container">
          {content}
        </div>
      </div>
    </div>;
  }

}

export default connect(select, {...AssessmentActions})(Assessment);
