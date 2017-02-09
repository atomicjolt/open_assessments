import React    from 'react';

export default function inactiveHeader(props) {
  return (
    <div className="o-item__top">
      <div className="o-left">
        <h3 className="c-question__number">Question 1</h3>
        <div className="c-question__type">&nbsp;&nbsp; - &nbsp;&nbsp; Multiple Choice</div>
      </div>

      <div className="o-right c-question-icons">
        <button className="c-btn c-btn--square" tabIndex="-1"><i className="material-icons">remove_red_eye</i></button>
        <button className="c-btn c-btn--square" tabIndex="-1"><i className="material-icons">swap_vert</i></button>
        <button className="c-btn c-btn--square" tabIndex="-1"><i className="material-icons">delete</i></button>
      </div>
    </div>
  );
}

inactiveHeader.propTypes = {};
