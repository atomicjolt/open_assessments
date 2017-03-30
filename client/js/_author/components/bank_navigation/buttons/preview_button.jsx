import React from 'react';
import appHistory from '../../../history';

export default function PreviewButton(props) {
  const isPublished = props.assessment.isPublished;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? '' : 'is-inactive'}`}
      onClick={(e) => {
        e.stopPropagation();
        appHistory.push(`banks/${props.assessment.bankId}/assessments/${props.assessment.id}/preview`);
      }}
    >
      <i className="material-icons">remove_red_eye</i>
    </button>
  );
}

PreviewButton.propTypes = {
  assessment: React.PropTypes.shape({
    isPublished: React.PropTypes.bool.isRequired,
    bankId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  }).isRequired,
};
