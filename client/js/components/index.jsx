"use strict";

import React               from "react";
import { connect }         from "react-redux";
import { loadAssessment }  from "../actions/assessment";
import LocalizedStrings    from 'react-localization';
import locales             from '../locales/locales';

// @connect(null, { loadAssessment }, null, { withRefs: true })
export class Index extends React.Component {

  componentWillMount(){
    // Load the assessment
    this.props.loadAssessment();
  }

  render(){
    let strings = new LocalizedStrings(locales());
    return <div>
      <p>{strings.assessments.new}</p>
      {this.props.children}
    </div>;
  }

}

export default connect(null, { loadAssessment }, null, { withRefs: true })(Index);
