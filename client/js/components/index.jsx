"use strict";

import React               from "react";
import { connect }         from "react-redux";
import { loadAssessment }  from "../actions/assessment";

@connect(null, { loadAssessment }, null, { withRefs: true })
class Index extends React.Component {

  componentWillMount(){
    // Load the assessment
    this.props.loadAssessment();
  }

  render(){
    return <div>
      {this.props.children}
    </div>;
  }

}

export default Index;
