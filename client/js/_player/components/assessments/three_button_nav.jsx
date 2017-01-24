"use strict";

import React from "react";

import Button                    from "../common/button";
import CheckButton               from "./check_button";
import {NextButton, PrevButton}  from "./nav_buttons";


/**
 * Component to display 3-button style nav.  Will always render out previous,
 * next, and check answer.  CSS tricks can be played on the disabled attribute
 * of each to hide them, if desired.
 */
export default class ThreeButtonNav extends React.Component {

  render() {
    return (
      <div className="c-assessment-navigation">
        <div className="c-button-slot">
          <PrevButton/>
        </div>
        <div className="c-button-slot">
          <CheckButton/>
        </div>
        <div className="c-button-slot">
          <NextButton/>
        </div>
      </div>
    );
  }
};
