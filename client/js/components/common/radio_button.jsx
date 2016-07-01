"use strict";

import React                  from "react";
import * as AssessmentActions from "../../actions/assessment";
import Styles                 from "../../themes/selection.js";


export default class RadioButton extends React.Component{

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    isHtml: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool
  }

  static contextTypes = {
    theme: React.PropTypes.object
  }

  answerSelected(){
    // AssessmentActions.answerSelected(this.props.item); TODO
  }

  checkedStatus(){
    var checked     = null;
    var optionFlag  = null;

    if(this.props.checked === true) {
      checked = "true";
    } else if(this.props.checked === false) {
      checked = false;
    } else if(!this.props.isDisabled) {
      // checked = (AssessmentStore.studentAnswers() && AssessmentStore.studentAnswers().indexOf(this.props.item.id) > -1) ? "true" : null; TODO
    }

    return checked;
  }

  optionFlagStatus(){
    var optionFlag;

    if(this.props.showAsCorrect){
      var label = "Correct Answer that was ";
      label += this.checkedStatus() ? "chosen" : "not chosen";
      optionFlag = <div className="correctIndicator"
                        aria-label={label}
                        style={Styles.checkStyleCorrect}>&#10003;</div>;
    } else if (this.props.showAsCorrect === false && this.checkedStatus()){
      optionFlag = <div className="wrongIndicator"
                        aria-label="Wrong answer that was chosen"
                        style={Styles.checkStyleWrong}>&#10008;</div>;
    }

    return optionFlag;
  }

  renderMaterial(material, isHtml) {
    if(isHtml) {
      return <span style={ Styles.span }
                   dangerouslySetInnerHTML={{__html: material}}></span>;
    } else {
      return <span style={ Styles.span }>{material}</span>;
    }
  }

  render() {
    const props = this.props;
    return (
      <div>
        {this.optionFlagStatus()}
        <div className="btn btn-block btn-question" style={Styles.btnQuestion}>
          <label>
            <input type="radio"
                   defaultChecked={this.checkedStatus()}
                   disabled={props.isDisabled}
                   name={props.name}
                   onClick={() => { this.answerSelected(); }} />
            { this.renderMaterial(props.item.material, props.isHtml) }
          </label>
        </div>
      </div>
    );
  }
}
