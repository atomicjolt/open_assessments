"use strict";

import React							    from "react";
import * as AssessmentActions from "../../actions/assessment";

export default class Option extends React.Component{

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired
  }

  answerSelected(){
    //AssessmentActions.answerSelected(this.props.item.id);
  }

  render(){

    var materialItems = this.props.item.material.map((mat) =>{
      return <option key={mat} value={mat} name={this.props.name}>{mat}</option>;
    });

    return(
      <div>
		    <select onChange={()=>{ this.answerSelected(); }}>
          {materialItems}
        </select>
      </div>
    );
  }
}
