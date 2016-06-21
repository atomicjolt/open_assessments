"use strict";

import React          from "react";
import { connect }    from "react-redux";

import CommHandler    from "../../utils/communication_handler";

const select = (state, props) => {
  return {
    show_post_message_navigation: state.settings.get("show_post_message_navigation")
  };
};

export class StudyPlanButton extends React.Component {

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

export default connect(select, {})(StudyPlanButton);