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

  selectAnswer(){
    this.props.selectAnswer(this.props.item.id);
  }

  getFeedback(){
    if(this.props.feedback){
      return (
        <div className="c-answer-feedback">
            <div
              dangerouslySetInnerHTML={{__html:this.props.feedback}}/>
        </div>
      );
    }
  }

  renderMaterial(material, isHtml) {
    if(isHtml) {
      return <div className="c-answer-container__content"
                  dangerouslySetInnerHTML={{__html: material}} />;
    } else {
      return (
        <div className="c-answer-container__content">
          <p>{material}</p>
        </div>
      );
    }
  }

  render() {
    const props = this.props;
    var containerStyle = "";
    var feedback = this.getFeedback();

    if(this.props.checked === true){containerStyle = "is-clicked";}

    return (
      <li className={`c-answer-container ${containerStyle}`}>
        <FeedbackIcon gradeState={props.gradeState} />
        <label
          htmlFor={props.id}>
          <div className="c-answer-container__radio">
            <div className="c-checkbox">
              <input type="checkbox"
                     checked={props.checked}
                     disabled={props.isDisabled}
                     name="answer-checkbox"
                     onChange={() => { this.selectAnswer(); }}
                     id={props.id}/>
                   <div className="c-checkbox__border">
                <span></span>
               </div>
            </div>
          </div>
          <div className="c-answer-container__content">
            {this.renderMaterial(props.item.material, props.isHtml)}
          </div>
        </label>
        {feedback}
      </li>
    );
  }
}
