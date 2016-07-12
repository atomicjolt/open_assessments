"use strict";

import React              from "react";
import { connect }        from "react-redux";
import { localizeStrings }   from '../../selectors/localize';
import History                from "../../history";
import * as AssessmentActions from "../../actions/assessment";

const select = (state, props) => {
  return {
    title            : state.assessment.title,
    assessment_kind  : state.settings.assessment_kind,
    localizedStrings : localizeStrings(state, props)
  };
};

export class Start extends React.Component{

  instructions(){
    var instruction;
    var strings = this.props.localizedStrings.start;

    switch (this.props.assessment_kind){
      case "SUMMATIVE":
        // Get summative instructions
        instruction = <div>{strings.summativeInstruction}</div>;
        // TODO display student progress
        break;
      case "FORMATIVE":
        // Get formative instructions
        instruction = <div>{strings.formativeInstruction}</div>;
        break;
      case "SHOW_WHAT_YOU_KNOW":
        // Get show what you know instructions
        // TODO display student progress student progress
        instruction = <div>{strings.showWhatYouKnowInstruction}</div>;

        break;
      default:
        instruction = <div></div>;
    }
    return instruction;
  }

  render(){
    return <div className="assessment">
      <div>{this.props.title}</div>
      <div className="section_list">
        <div className="section_container">
          {this.instructions()}
        <div>
          <button onClick={()=>{History.push('assessment');}}>
            {this.props.localizedStrings.start.startButton}
          </button>
        </div>
        </div>
      </div>
    </div>;
  }

}

export default connect(select, {...AssessmentActions})(Start);
