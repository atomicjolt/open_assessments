"use strict";

import React from "react";

import Button                    from "../common/button";
import CheckButton               from "./check_button";
import {NextButton, PrevButton}  from "./nav_buttons";


/**
 * Component to display two button style nav. Will render two buttons, primary
 * button and secondary button. Primary button will be displayed in one of three
 * states: "next questions", "check answer", or "submit asessment". Secondary button
 * will either render previous questions button, or nothing at all if no
 * previous questions are available.
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
