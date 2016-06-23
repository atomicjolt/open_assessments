"use strict";

import React                  from "react";
import * as AssessmentActions from "../../actions/assessment";

export default class RadioButton extends React.Component{

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    selectAnswer: React.PropTypes.func.isRequired,
    isDisabled: React.PropTypes.bool,
    checked: React.PropTypes.bool
  };

  selectAnswer(){
    this.props.selectAnswer(this.props.item.id);
  }

  checkedStatus(){
    let checked = null;
    let optionFlag = null;
    if( this.props.checked === true ) {
      checked = "true";
    } else if ( this.props.checked === false ){
      checked = false;
    } else if ( !this.props.isDisabled ) {
      // checked = (AssessmentStore.studentAnswers() && AssessmentStore.studentAnswers().indexOf(this.props.item.id) > -1) ? "true" : null; TODO
    }
    return checked;
  }

  optionFlagStatus(){
    if(this.props.showAsCorrect){
      var label = "Correct Answer that was ";
      var optionFlag;
      label += this.checkedStatus() ? "chosen" : "not chosen";
      optionFlag = <div className="correctIndicator" aria-label={label}>&#10003;</div>;
    } else if (this.props.showAsCorrect === false && this.checkedStatus()){
      optionFlag = <div className="wrongIndicator" aria-label="Wrong answer that was chosen">&#10008;</div>;
    }
    return optionFlag;
  }

  render(){
    var checked = null;
    var optionFlag = null;

    var checked = this.checkedStatus();

    // var radio = <input type="radio" defaultChecked={checked} disabled={this.props.isDisabled} name={this.props.name} onClick={()=>{ this.selectAnswer();}}/>;

    if(this.props.showAsCorrect){
      var label = "Correct Answer that was ";
      label += checked ? "chosen" : "not chosen";
      optionFlag = <div className="correctIndicator" aria-label={label}>&#10003;</div>;
    } else if (this.props.showAsCorrect === false && checked){
      optionFlag = <div className="wrongIndicator" aria-label="Wrong answer that was chosen">&#10008;</div>;
    }

    return (
      <div>
        {this.optionFlagStatus()}
        <div className="btn btn-block btn-question">
          <label>
            <input
              type="radio"
              defaultChecked={this.checkedStatus()}
              disabled={this.props.isDisabled}
              name={this.props.name}
              onClick={()=>{ this.selectAnswer();}}
            />
            <span>{this.props.item.material}</span>
          </label>
        </div>
      </div>
    );
  }
}
