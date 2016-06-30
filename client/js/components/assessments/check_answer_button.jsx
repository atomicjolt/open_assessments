"use strict";

import React from "react";

export default class CheckAnswerButton extends React.Component{

  static propTypes = {
    // Function to be called when check answers button is clicked
    checkAnswers: React.PropTypes.func.isRequired,
  };

  render(){
    return (
  		<a
        onClick={(e) => this.props.checkAnswers(e)}
        className="c-btn c-btn--check-answer">
  			<span>check answer</span>
  		</a>
    );
  }
};
