"use strict";

import React from "react";

/**
 * Component to render a generic button. Can optionally wrap child components to
 * to be displayed. I.E. <Button><svg /><Button />
 */
export default class Button extends React.Component{

  static propTypes = {

    // The css class modifier the button should use.
    // Will construct css class string: c-btn c-btn--{buttonType}
    buttonClass: React.PropTypes.string.isRequired,

    // Function to be called on button click
    onClick: React.PropTypes.func,

    // Text to be displayed by button
    buttonText: React.PropTypes.string
  };

  render(){
    return (
      <a
        className={`${this.props.buttonClass}`}
        onClick={(e) => {this.props.onClick(e);}}>
        <span>{this.props.buttonText}</span>
        {this.props.children}
      </a>
    );
  }
  };
