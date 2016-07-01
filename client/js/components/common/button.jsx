"use strict";

import React from "react";

export default class Button extends React.Component{

  static propTypes = {
    buttonType: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
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
