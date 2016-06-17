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
    theme         : state.application.get('theme')
  };
};

@connect(select, {...AssessmentActions}, null, {withRef: true})
export default class Start extends React.Component{

  componentWillMount(){}

  componentDidMount(){
    // if(this.state.isLoaded){
    //   // Trigger action to indicate the assessment was viewed
    //   // AssessmentActions.assessmentViewed(this.props.settings, this.props.assessment);
    // }
    CommHandler.sendSize();
  }

  render(){
    var content;
    var progressBar;

    // if(this.props.settings.enableStart){
    //   content = <CheckUnderstanding />
    //   progressBar = <div>
    //                   <ProgressDropdown disabled={true} settings={this.props.settings} questions={this.state.allQuestions} currentQuestion={this.state.currentItemIndex + 1} questionCount={this.state.questionCount} />
    //                 </div>;

    // }
    const quizType = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "SUMMATIVE" ? "Quiz" : "Show What You Know";
    const titleBar = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "FORMATIVE" ? "" : <div>{this.props.settings ? this.props.settings.assessmentTitle : ""}</div>;
    progressBar    = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "FORMATIVE" ? "" : progressBar;

    return <div className="assessment">
      {titleBar}
      {progressBar}
      <div className="section_list">
        <div className="section_container">
          {/* content */}
        </div>
      </div>
      {
        //<FullPostNav/>
      }
    </div>;
  }

}

// NOTE case 1 - Only start button
// NOTE case 2 - Instructions and start button
// NOTE Skip to questions moved to index
