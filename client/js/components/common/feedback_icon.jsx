"use strict";

import React                  from "react";

import { CORRECT, INCORRECT, UNGRADED } from "../assessments/universal_input";

export default class FeedbackIcon extends React.Component{

  static propTypes = {
    // Whether answer is correct, incorrect, or has not been graded
    // Should be one of CORRECT, INCORRECT, UNGRADED.
    gradeState: React.PropTypes.string.isRequired
  };

  render(){
    var content = null;

    if(this.props.gradeState === CORRECT){
      content = (
        <div className="c-feedback  c-feedback--correct">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <path d="M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"/>
          </svg>
          <span>correct</span>
        </div>
      );
    } else if(this.props.gradeState === INCORRECT) {
      content = (
        <div className="c-feedback  c-feedback--incorrect">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
              <path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm10 27.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z"/>
          </svg>
          <span>incorrect</span>
        </div>
      );
    }

    return content;
  }
};
