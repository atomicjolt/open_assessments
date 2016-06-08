"use strict";

import React              from "react";
import { connect }        from "react-redux";

import appHistory         from "../../history";
import AssessmentActions  from "../../actions/assessment";
import CommHandler        from "../../utils/communication_handler";
import CheckUnderstanding from "../assessments/check_understanding";
import ProgressDropdown   from "../common/progress_dropdown";
import FullPostNav        from "../post_nav/full_post_nav.jsx";

const select = (state) => {
  return {
    settings      : state.settings.toJS(),
    assessment    : state.assessment,
    theme         : state.application.get('theme').toJS()
  };
};

@connect(select, {...AssessmentActions}, null, {withRef: true})
export default class Start extends React.Component{

  componentWillMount(){

    if(!this.props.settings.enableStart){
      appHistory.push("assessment");
    }
  }

  componentDidMount(){
    // if(this.state.isLoaded){
    //   // Trigger action to indicate the assessment was viewed
    //   // AssessmentActions.assessmentViewed(this.props.settings, this.props.assessment);
    // }
    CommHandler.sendSize();
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
        padding: this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() == "FORMATIVE" ? "" : theme.assessmentPadding,
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
    };
  }

  render(){
    var styles = this.getStyles({});
    var content;
    var progressBar;

    // if(this.props.settings.enableStart){
    //   content = <CheckUnderstanding />
    //   progressBar = <div style={styles.progressContainer}>
    //                   <ProgressDropdown disabled={true} settings={this.props.settings} questions={this.state.allQuestions} currentQuestion={this.state.currentItemIndex + 1} questionCount={this.state.questionCount} />
    //                 </div>;

    // }
    const quizType = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "SUMMATIVE" ? "Quiz" : "Show What You Know";
    const titleBar = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "FORMATIVE" ? "" : <div style={styles.titleBar}>{this.props.settings ? this.props.settings.assessmentTitle : ""}</div>;
    progressBar    = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "FORMATIVE" ? "" : progressBar;

    return <div className="assessment" style={styles.assessment}>
      {titleBar}
      {progressBar}
      <div className="section_list">
        <div className="section_container">
          {content}
        </div>
      </div>
      {
        //<FullPostNav/>
      }
    </div>;
  }

}
