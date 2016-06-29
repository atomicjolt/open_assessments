"use strict";

import React from "react";

export default (props) => {

  var buttonStyle = 'c-btn--previous';
  if(props.isFirstPage){buttonStyle = 'c-btn--hide';} // Hide previous button on first page
  return (
    <a
      className={`c-btn ${buttonStyle}`}
      onClick={(e) => { props.previousQuestions(e); }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
		    <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
	    </svg>
      <span>Previous</span>
    </a>
  );
};
