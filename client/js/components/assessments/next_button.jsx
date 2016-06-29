"use strict";

import React from "react";

export default (props) => {
  var nextButton = (
    <a
      className="c-btn c-btn--next"
      onClick={(e) => { props.nextQuestions(e); }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
	      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
		  </svg>
       <span>Next</span>
    </a>
  );

  if(props.isLastPage){
    nextButton = (
      <a
        className="c-btn c-btn--finish"
        onClick={(e) => {props.submitAssessment(e);}}>
	      <span>Submit</span>
       </a>
    );
  }

  return nextButton;
};
