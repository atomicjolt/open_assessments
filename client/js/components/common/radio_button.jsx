"use strict";

import React                  from "react";
import * as AssessmentActions from "../../actions/assessment";

export default class RadioButton extends React.Component{

  static propTypes = {
    // Item being displayed
    item: React.PropTypes.object.isRequired,

    // Unique html element id
    id: React.PropTypes.string.isRequired,

    selectAnswer: React.PropTypes.func.isRequired,

    

    // Whether or not input should be disabled
    isDisabled: React.PropTypes.bool,

    // Whether or not input should be selected
    checked: React.PropTypes.bool
  };

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

  getFeedbackImage(){
    var content;

    if(this.props.displayCorrect === true){
      content = (
        <div className="c-feedback  c-feedback--correct">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <path d="M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"/>
          </svg>
          <span>correct</span>
        </div>
      );
    } else if(this.props.displayIncorrect === true) {
      content = (
        <div className="c-feedback  c-feedback--incorrect">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
              <path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm10 27.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z"/>
          </svg>
          <span>incorrect</span>
        </div>
      );
    }

    return content;
  }

  getFeedback(){
    var content;
    if(this.props.feedback){
      content = (
        <div className="c-answer-feedback">
          <p>{this.props.feedback}</p>
        </div>
      );
      return content;
    }
  }


  render() {
    var containerStyle;
    var feedbackImage = this.getFeedbackImage();
    var feedback = this.getFeedback();

    if(this.props.checked === true){containerStyle = "is-clicked";}

    return (
      <li
        className={`c-answer-container ${containerStyle}`}
        onClick={() => { this.selectAnswer(); }}>
        {feedbackImage}
        <div className="c-answer-container__radio">
          <div className="c-radio-button">
            <input
              type="radio"
              checked={this.checkedStatus()}
              disabled={this.props.isDisabled}
              name="radio"
              id={this.props.id}/>
            <label
              for={this.props.id}>
              <span></span>
            </label>
          </div>
        </div>

        <div className="c-answer-container__content">
        <p>{this.props.item.material}</p>
        </div>
        {feedback}
      </li>
    );
  }
}
