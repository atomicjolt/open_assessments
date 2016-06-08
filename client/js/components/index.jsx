"use strict";

import React               from "react";
import { loadAssessment }  from "../actions/assessment";

class Index extends React.Component {

  componentWillMount(){
    // Load the assessment
    loadAssessment();
  }

  render(){
    return <div>
      {this.props.children}
    </div>;
  }

}

export default Index;
