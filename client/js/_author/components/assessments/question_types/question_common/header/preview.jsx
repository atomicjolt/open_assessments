import React    from 'react';

export default function previewHeader(props) {

  return (
    <div className="au-o-right au-c-question-icons au-c-question-icons--reorder">
      <button
        onClick={props.togglePreview}
        className="au-c-btn au-c-btn--sm au-c-btn--white"
      >
        Close Preview
      </button>
    </div>
  );
}

previewHeader.propTypes = {
  togglePreview: React.PropTypes.func,
};
