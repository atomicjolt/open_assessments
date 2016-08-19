"use strict";

import React        from "react";
import { connect }  from "react-redux";

import { loadAssessment }         from "../actions/assessment";
import * as CommunicationActions  from "../actions/communications";
import appHistory                 from "../history";
import { availableLocales }       from "../locales/locales";

const select = (state) => {
  return {
    maxAttempts: state.settings.max_attempts,
    userAttempts: state.settings.userAttempts,
    enableStart: state.settings.enable_start
  };
};

export class Index extends React.Component {

  componentWillMount() {
    parent.postMessage({
      open_assessments_msg: "open_assessments_available_locales",
      available_locales: availableLocales()
    }, "*");

    this.props.loadAssessment();

    if(this.props.userAttempts &&
       this.props.userAttempts >= this.props.maxAttempts) {
      appHistory.push("retries-exceeded");
    } else if(!this.props.enableStart) {
      appHistory.push("assessment");
    }
  }

  componentDidMount() {
    this.props.sendSize();
    this.props.scrollParentToTop();
  }

  componentDidUpdate() {
    this.props.sendSize();
    this.props.scrollParentToTop();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(select, {loadAssessment, ...CommunicationActions}, null, {withRefs: true})(Index);
