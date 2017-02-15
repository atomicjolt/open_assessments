import React    from 'react';

export default function inactiveHeader(props) {
  return (
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
  );
}

inactiveHeader.propTypes = {
  id: React.PropTypes.string,
  deleteAssessmentItem: React.PropTypes.func,
  toggleReorder: React.PropTypes.func,
};
