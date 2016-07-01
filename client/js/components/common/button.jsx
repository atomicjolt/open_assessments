"use strict";

import React from "react";

export default class Button extends React.Component{

  static propTypes = {

    // The css class modifier the button should use.
    // Will construct css class string: c-btn c-btn--{buttonType}
    buttonType: React.PropTypes.string.isRequired,

    // Function to be called on button click
    onClick: React.PropTypes.func.isRequired,

    // Text to be displayed by button
    buttonText: React.PropTypes.string
  };

  render(){
    return (
      <a
        className={`c-btn c-btn--${this.props.buttonType}`}
        onClick={(e) => {this.props.onClick(e);}}>
        <span>{this.props.buttonText}</span>
        {this.props.children}
      </a>
    );
  }
  };
