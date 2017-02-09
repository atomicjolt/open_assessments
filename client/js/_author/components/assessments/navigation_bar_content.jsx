import React            from 'react';
import { hashHistory }  from 'react-router';

export default function (props) {
  return (
    <div className="c-header-bottom">
      <div className="c-header-bottom__left">
        <button
          onClick={() => hashHistory.goBack()}
          className="c-btn c-btn--sm c-btn--outline c-btn--back"
        >
          <i className="material-icons">keyboard_arrow_left</i>
          Back
        </button>
      </div>

      <div className="c-header-bottom__right">
        <button className="c-btn c-btn--sm c-btn--green">
          <i className="material-icons">cloud_upload</i>
          Publish
        </button>
        <button className="c-btn c-btn--sm c-btn--maroon u-ml-md">
          <i className="material-icons">remove_red_eye</i>
          Preview Assessment
        </button>
      </div>
    </div>
  );
}
