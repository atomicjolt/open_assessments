"use strict";

import React              from "react";
import { connect }        from "react-redux";

import History         from "../../history";
import AssessmentActions  from "../../actions/assessment";

const select = (state) => {
  return {
    settings      : state.settings,
    assessment    : state.assessment,
    theme         : state.application
  };
};

export class Start extends React.Component{

  instructions(){
    const kind = this.props.assessment.get('assessment_kind', '').toUpperCase();
    let instruction;

    switch (kind) {
      case "SUMMATIVE":
        // Get summative instructions
        instruction = (<div>Summative Quiz</div>);
        // TODO display student progress
        break;
      case "FORMATIVE":
        // Get formative instructions
        instruction = (<div>Formative Quiz</div>);
        break;
      case "SHOW_WHAT_YOU_KNOW":
        // Get show what you know instructions
        // TODO display student progress student progress
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
    const titleText = this.props.assessment.get('title', '');

    return <div className="assessment">
      <div>{titleText}</div>
      <div className="section_list">
        <div className="section_container">
          {this.instructions()}
        <div>
          <button onClick={()=>{History.push('assessment');}}>
            {startButtonText}
          </button>
        </div>
        </div>
      </div>
    </div>;
  }

}

export default connect(select, {...AssessmentActions})(Start);
