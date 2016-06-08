"use strict";

import React              from 'react';
import { connect }        from "react-redux";

import AssessmentActions  from "../../actions/assessment";
import appHistory         from "../../history";
import Item               from "../assessments/item";
import Loading            from "../assessments/loading";
import ProgressDropdown   from "../common/progress_dropdown";

const select = (state) => {
  return {
      settings             : state.settings,
      assessment           : state.assessment.current,
      isLoaded             : state.assessment.isLoaded,
      isSubmitted          : state.assessment.isSubmitted,
      question             : state.assessment.currentQuestion,
      currentItemIndex     : state.assessment.currentItemIndex,
      questionCount        : state.assessment.questionCount,
      assessmentResult     : state.assessment.assessmentResult,
      // showStart            : showStart, TODO calculate elsewhere
      settings             : state.assessment.current,
      messageIndex         : state.assessment.answerMessageIndex,
      studentAnswers       : state.assessment.allStudentAnswers,
      allQuestions         : state.assessment.allQuestions,
      outcomes             : state.assessment.outcomes
  };
}

@connect(select, {...AssessmentActions}, null, {withRef: true})
export default class Assessment extends React.Component{

  // constructor(props, context){
  //   super(props, context);
  //   this.state = {};
  //   // this._bind["checkCompletion", "getStyles"];
  //   this.context = context;
  // }

  componentWillMount(){
    if(this.props.assessmentResult != null){
      appHistory.push("assessment-result");
    }
  }

  // componentDidMount(){
  //   if(this.state.isLoaded){
  //     // Trigger action to indicate the assessment was viewed
  //     //AssessmentActions.assessmentViewed(this.state.settings, this.state.assessment);
  //   }
  // }
  //
  popup(){
    return "Don’t leave!\n If you leave now your quiz won't be scored, but it will still count as an attempt.\n\n If you want to skip a question or return to a previous question, stay on this quiz and then use the \"Progress\" drop-down menu";
  }


  checkProgress(current, total){
    return Math.floor(current/total * 100);
  }

  getStyles(){
    const theme = this.props.theme;
    var minWidth = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() == "FORMATIVE" ? "480px" : "635px";

    return {
      progressBar: {
        backgroundColor: theme.progressBarColor,
        height: theme.progressBarHeight,
      },
      progressDiv: {
        height: theme.progressBarHeight
      },
      assessment: {
        padding: this.state.settings.assessmentKind.toUpperCase()  == "FORMATIVE" ? "" : theme.assessmentPadding,
        backgroundColor: theme.assessmentBackground,
        minWidth: minWidth
      },
      progressContainer: {
        padding: "10px 20px 10px 20px",
        position: "absolute",
        left: "0px",
        top: "44px",
        width: "100%",
        minWidth: minWidth,
        backgroundColor: theme.titleBarBackgroundColor,
      },
      titleBar: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        padding: "10px 20px 10px 20px",
        backgroundColor: theme.primaryBackgroundColor,
        color: "white",
        fontSize: "130%",
        minWidth: minWidth,
        //fontWeight: "bold"
      }
    }
  }

  render(){
    window.onbeforeunload = this.popup;
    // // if(AssessmentStore.assessmentResult() != null || this.state.settings.assessmentKind.toUpperCase() != "SUMMATIVE"){
    //   // window.onbeforeunload = null;
    // // }

    var showStart = this.props.settings.enableStart && !this.props.assessment.isStarted();
    var styles = this.getStyles()
    var content;
    var progressBar;
    var titleBar;
    if(!this.state.props.ed || this.state.isSubmitted){
      content = <Loading />;
    // } else if(this.state.showStart){
    //     content         = <CheckUnderstanding
    //     title           = {this.state.assessment.title}
    //     name            = {this.state.question.name}
    //     maxAttempts     = {this.state.settings.allowedAttempts}
    //     userAttempts    = {this.state.settings.userAttempts}
    //     eid             = {this.state.settings.lisUserId}
    //     isLti           = {this.state.settings.isLti}
    //     assessmentId    = {this.state.assessment.assessmentId}
    //     assessmentKind  = {this.state.settings.assessmentKind}
    //     primaryOutcome  = {this.state.outcomes[0]}
    //     ltiRole         = {this.state.settings.ltiRole}
    //     icon            = {this.state.settings.images.QuizIcon_svg}/>;
    //     progressBar     = <div style={styles.progressContainer}>
    //                         {progressText}
    //                         <ProgressDropdown disabled={true} questions={this.state.allQuestions} currentQuestion={this.state.currentItemIndex + 1} questionCount={this.state.questionCount} />
    //                       </div>;

    // }
     }else {
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
        confidenceLevels = {this.props.settings.confidenceLevels}
        outcomes         = {this.props.outcomes}/>;
        progressBar      =  <div style={styles.progressContainer}>
                              {progressText}
                              <ProgressDropdown settings={this.state.settings} questions={this.state.allQuestions} currentQuestion={this.state.currentItemIndex + 1} questionCount={this.state.questionCount} />
                            </div>;
    // // TODO figure out when to mark an item as viewed. assessmentResult must be valid before this call is made.
    //   // AssessmentActions.itemViewed(this.state.settings, this.state.assessment, this.state.assessmentResult);
    }

    var percentCompleted = this.checkProgress(this.props.currentItemIndex, this.props.questionCount);
    var progressStyle = {width:percentCompleted+"%"};
    var progressText = "";
    var quizType = this.props.settings.assessmentKind.toUpperCase() === "SUMMATIVE" ? "Quiz" : "Show What You Know";
    var titleBar = this.props.settings.assessmentKind.toUpperCase() === "FORMATIVE" ?  "" : <div style={styles.titleBar}>{this.props.assessment ? this.props.assessment.title : ""}</div>;
    if(this.props.assessment){
      progressText = this.context.theme.shouldShowProgressText ? <div><b>{this.props.assessment.title + " Progress"}</b>{" - You are on question " + (this.props.currentItemIndex + 1) + " of " + this.props.questionCount}</div> : "";
    }
    progressBar = this.props.settings.assessmentKind.toUpperCase() === "FORMATIVE" ? "" : progressBar;
    return<div className="assessment" style={styles.assessment}>
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

Assessment.contextTypes = {
  router: React.PropTypes.func,
  theme: React.PropTypes.object,
};
