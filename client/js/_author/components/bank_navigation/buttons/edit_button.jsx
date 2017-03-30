import React from 'react';

export default function EditButton(props) {
  const isPublished = props.assessment.isPublished;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
    >
      <i className="material-icons">edit</i>
    </button>
  );
}

EditButton.propTypes = {
  assessment: React.PropTypes.shape({
    isPublished: React.PropTypes.boolean.isRequired,
  }).isRequired,
};
