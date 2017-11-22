import React from 'react';

import CheckButton               from './check_button';
import { NextButton, PrevButton }  from './nav_buttons';


/**
 * Component to display 3-button style nav.  Will always render out previous,
 * next, and check answer.  CSS tricks can be played on the disabled attribute
 * of each to hide them, if desired.
 */
export default function ThreeButtonNav() {
  return (
    <nav className="c-assessment-navigation" aria-label="question">
      <div className="c-button-slot">
        <CheckButton />
      </div>
      <div className="c-button-slot">
        <NextButton />
      </div>
      <div className="c-button-slot">
        <PrevButton />
      </div>
    </nav>
  );
}
