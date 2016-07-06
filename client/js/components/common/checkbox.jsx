"use strict";

import React                    from "react";
import * as AssessmentActions   from "../../actions/assessment";
import Styles                   from "../../themes/selection.js";

const styles = Styles;

export default class CheckBox extends React.Component{

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired
  }

  answerSelected(){
    AssessmentActions.answerSelected(this.props.item);
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
              name={this.props.name}
              onClick={()=>{ this.answerSelected(); }}/>
            <span>{this.props.item.material}</span>
          </label>
        </div>
      </div>
    );
  }
}
