import React     from 'react';
import DotLoader from '../../../../common/dot_loader';

export default function DefaultHeader(props) {
  if (props.isRemoving) { return <DotLoader />; }
  return (
    <div className="au-o-right au-c-question-icons">
      <button
        className="au-c-btn au-c-btn--square"
        tabIndex="0"
        onClick={props.togglePreview}
      >
        <i className="material-icons">remove_red_eye</i>
      </button>
      <button
        className="au-c-btn au-c-btn--square"
        tabIndex="0"
        onClick={props.toggleReorder}
      >
        <i className="material-icons">swap_vert</i>
      </button>
      <button
        className="au-c-btn au-c-btn--square"
        tabIndex="0"
        onClick={() => props.deleteAssessmentItem(props.id)}
      >
        <i className="material-icons">delete</i>
      </button>
    </div>
  );
}

DefaultHeader.propTypes = {
  id: React.PropTypes.string,
  deleteAssessmentItem: React.PropTypes.func,
  toggleReorder: React.PropTypes.func,
  isRemoving: React.PropTypes.bool,
  togglePreview: React.PropTypes.func,
};
