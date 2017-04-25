import React    from 'react';
import localize from '../../../../../locales/localize';

function previewHeader(props) {
  const strings = props.localizeStrings('previewHeader');
  return (
    <div className="au-o-right au-c-question-icons au-c-question-icons--reorder">
      <button
        onClick={props.togglePreview}
        className="au-c-btn au-c-btn--sm au-c-btn--white"
      >
        {strings.closePreview}
      </button>
    </div>
  );
}

previewHeader.propTypes = {
  togglePreview: React.PropTypes.func,
  localizeStrings: React.PropTypes.func.isRequired
};

export default localize(previewHeader);
