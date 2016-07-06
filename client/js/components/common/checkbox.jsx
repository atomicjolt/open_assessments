"use strict";

import React from "react";

import { CORRECT, INCORRECT, UNGRADED } from "../assessments/universal_input";
import FeedbackIcon from "./feedback_icon";

export default class CheckBox extends React.Component{

  static propTypes = {
    // Item being displayed
    item: React.PropTypes.object.isRequired,

    // Unique html element id
    id: React.PropTypes.string.isRequired,

    // Whether the material is raw HTML to be embedded "dangerously."
    isHtml: React.PropTypes.bool,

    selectAnswer: React.PropTypes.func.isRequired,

    // Whether answer is correct, incorrect, or has not been graded.
    // Should be one of CORRECT, INCORRECT, UNGRADED.
    gradeState: React.PropTypes.string.isRequired,

    // Whether or not input should be disabled
    isDisabled: React.PropTypes.bool,

    // Whether or not input should be selected
    checked: React.PropTypes.bool
  }

  answerSelected(){
    this.props.selectAnswer();
    // AssessmentActions.answerSelected(this.props.item);
  }

  checkedStatus(){
    return this.props.checked === true;
  }


  render(){
    return (
      <div>
        {/*this.optionFlagStatus() TODO feedback */}
        <div className="btn btn-block btn-question" style={styles.btnQuestion}>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.checkedStatus()}
              disabled={this.props.isDisabled}
              name="checkbox"
              onClick={()=>{ this.answerSelected(); }}/>
            <span>{this.props.item.material}</span>
          </label>
        </div>
      </div>
    );
  }
}
