"use strict";

import React          from "react";
import { connect }    from "react-redux";

import CommHandler    from "../../utils/communication_handler";

const select = (state, props) => {
  return {
    display: state.settings.show_post_message_navigation
  };
};

@connect(select, null, null, { withRefs: true })
export default class StudyPlanButton extends React.Component {

  render() {
    if (!this.props.display || self == top) {
      return <div></div>;
    }

    return <div>
      <button className="lti-nav-btn" id="study-plan" onClick={()=>{CommHandler.navigateHome();}}>
        View updated study plan
      </button>
    </div>;
  }
};