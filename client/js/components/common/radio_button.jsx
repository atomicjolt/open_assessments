"use strict";

import React                  from "react";

import { CORRECT, INCORRECT, UNGRADED } from "../assessments/universal_input";
import * as AssessmentActions from "../../actions/assessment";
import FeedbackIcon from "./feedback_icon";


export default class RadioButton extends React.Component{

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

  checkedStatus(){
    let checked = null;
    let optionFlag = null;

    if(this.props.checked === true) {
      checked = true;
    } else if(this.props.checked === false) {
      checked = false;
    } else if(!this.props.isDisabled) {
      // checked = (AssessmentStore.studentAnswers() && AssessmentStore.studentAnswers().indexOf(this.props.item.id) > -1) ? "true" : null; TODO
    }

    return checked;
  }

  getFeedback(){
    if(this.props.feedback){
      return (
        <div className="c-answer-feedback">
          <div
            dangerouslySetInnerHTML={{__html:this.props.feedback}/*TODO handle when not html*/}/>
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
    var containerStyle;

    if(this.props.checked === true){containerStyle = "is-clicked";}

    return (
      <li className={`c-answer-container ${containerStyle}`}
          onClick={() => { this.selectAnswer(); }}>
        <FeedbackIcon gradeState={props.gradeState} />
        <div className="c-answer-container__radio">
          <div className="c-radio-button">
            <input type="radio"
                   checked={this.checkedStatus()}
                   disabled={props.isDisabled}
                   name="radio"
                   id={props.id} />
            <label for={props.id}>
              <span>{this.renderMaterial(props.item.material, props.isHtml)}</span>
            </label>
          </div>
        </div>
        {this.getFeedback()}
      </li>
    );
  }
}
