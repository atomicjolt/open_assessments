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
    settings      : state.settings,
    assessment    : state.assessment,
    theme         : state.application
  };
};

export class Start extends React.Component{

  instructions(){
    const kind = this.props.kind.get('assessmentKind', '').toUpperCase();
    let instruction;

    switch (kind) {
      case "SUMMATIVE":
        // Get summative instructions
        instruction = (<div>Summative Quiz</div>);
        break;
      case "FORMATIVE":
        // Get formative instructions
        instruction = (<div>Formative Quiz</div>);
        break;
      case "SHOW_WHAT_YOU_KNOW":
        // Get show what you know instructions
        instruction = (
          <div>
            <h2>Show What You Know</h2>
            <div>Take this pre-test to see what you already know about the concepts in this section.</div>
            <div>The pre-test does not count toward your grade, but will help you plan where to focus</div>
            <div>your time and effort as you study. The pre-test is optional.</div>
          </div>
        );
        break;
      default:
        instruction = (<div></div>);
    }
    return instruction;
  }

  render(){
    const startButtonText = "Start Quiz";
    var content;
    var progressBar;

    // if(this.props.settings.enableStart){
    //   content = <CheckUnderstanding />
    //   progressBar = <div>
    //                   <ProgressDropdown disabled={true} settings={this.props.settings} questions={this.state.allQuestions} currentQuestion={this.state.currentItemIndex + 1} questionCount={this.state.questionCount} />
    //                 </div>;

    // }
    // const quizType = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "SUMMATIVE" ? "Quiz" : "Show What You Know";
    // const titleBar = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "FORMATIVE" ? "" : <div>{this.props.settings ? this.props.settings.assessmentTitle : ""}</div>;
    // progressBar    = this.props.settings.assessmentKind && this.props.settings.assessmentKind.toUpperCase() === "FORMATIVE" ? "" : progressBar;

    return <div className="assessment">
      {/*titleBar*/}
      {/*progressBar*/}
      <div className="section_list">
        <div className="section_container">
          {instructions()}
        <div>
          <button onClick={()=>{history.push('assessment');}}>
            {startButtonText}
          </button>
        </div>);
        </div>
      </div>
      {/*<FullPostNav/>*/}
    </div>;
  }

}

// NOTE case 1 - Only start button
// NOTE case 2 - Instructions and start button
// NOTE Skip to questions moved to index
// NOTE Moved check attempts to index
// NOTE Move send size to index
// NOTE Moved assessment viewed to assessment

export default connect(select, {...AssessmentActions})(Start);
