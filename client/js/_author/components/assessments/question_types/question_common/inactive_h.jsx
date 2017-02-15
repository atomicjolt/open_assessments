import React    from 'react';

export default function inactiveHeader(props) {
  return (
    <div className="o-item__top">
      <div className="o-left">
        <h3 className="c-question__number">Question {props.index + 1}</h3>
        <div className="c-question__type">&nbsp;&nbsp; - &nbsp;&nbsp; {props.type}</div>
      </div>

      <div className="o-right c-question-icons">
        <button
          className="c-btn c-btn--square"
          tabIndex="0"
        >
          <i className="material-icons">remove_red_eye</i>
        </button>
        <button
          className="c-btn c-btn--square"
          tabIndex="0"
          onClick={props.toggleReorder}
        >
          <i className="material-icons">swap_vert</i>
        </button>
        <button
          className="c-btn c-btn--square"
          tabIndex="0"
          onClick={() => props.deleteAssessmentItem(props.id)}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  );
}

inactiveHeader.propTypes = {
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  id: React.PropTypes.string,
  deleteAssessmentItem: React.PropTypes.func,
  toggleReorder: React.PropTypes.func,
};
