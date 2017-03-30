import React from 'react';

export default function DeleteButton(props) {
  const { deleteAssessment, assessment } = props;
  const isPublished = assessment.isPublished;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
      onClick={e => deleteAssessment(e, assessment.bankId, assessment.id)}
    >
      <i className="material-icons">delete</i>
    </button>
  );
}

DeleteButton.propTypes = {
  deleteAssessment: React.PropTypes.func.isRequired,
  assessment: React.PropTypes.shape({
    isPublished: React.PropTypes.bool.isRequired,
    bankId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  }).isRequired,
};
