"use strict";

import React                      from "react";
import { connect }                from "react-redux";
import * as CommunicationActions  from "../../actions/communications";

const select = (state, props) => {
  return {
    show_post_message_navigation: state.settings.show_post_message_navigation
  };
};

export class FullPostNav extends React.Component {

  render() {
    if (!this.props.show_post_message_navigation || self == top) {
      return <div></div>;
    }

    return <div className="lti-bottom-nav-buttons">
      <button className="lti-nav-btn" id="lti-prev" onClick={()=>{this.props.navigatePrevious();}}><span className="lti-btn-arrow">&#10094;</span><span className="lti-btn-text">Previous</span></button>
      <button className="lti-nav-btn" id="lti-next" onClick={()=>{this.props.navigateNext();}}><span className="lti-btn-text">Next</span><span className="lti-btn-arrow">&#10095;</span></button>
      <button className="lti-nav-btn" id="study-plan" onClick={()=>{this.props.navigateHome();}}>Study Plan</button>
    </div>;
  }
};

export default connect(select, { ...CommunicationActions })(FullPostNav)
