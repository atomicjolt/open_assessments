"use strict";

import React                      from "react";

export default (props) => {
  if (!props.show_post_message_navigation || self == top) {
    return <div></div>;
  }

  return <div>
    <button className="lti-nav-btn" id="study-plan" onClick={()=>{props.navigateHome();}}>
      View updated study plan
    </button>
  </div>;
};
