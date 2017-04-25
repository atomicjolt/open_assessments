import React from 'react';

export default function PublishButton(props) {
  const { togglePublishAssessment, assessment } = props;
  const isPublished = assessment.isPublished;
  const icon = isPublished ?
    <i className="material-icons is-published">cloud_done</i> :
    <i className="material-icons">cloud_upload</i>;
  if (!assessment.isToggling) {
    return (
      <button
        className={`au-c-btn au-c-btn--square au-c-publish ${isPublished ? 'is-published' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          togglePublishAssessment(assessment);
        }}
        onFocus={props.onFocus}
      >
        { icon }
      </button>
    );
  }

  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-publish ${isPublished ? 'is-published' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onFocus={props.onFocus}
    >
      { icon }
    </button>
  );

}

PublishButton.propTypes = {
  togglePublishAssessment: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  assessment: React.PropTypes.shape({}).isRequired,
};
