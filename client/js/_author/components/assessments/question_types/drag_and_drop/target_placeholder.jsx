import React    from 'react';
import localize from '../../../../locales/localize';

function targetPlaceholder(props) {
  const strings = props.localizeStrings('targetPlaceholder');

  // TODO: localization
  return (
    <div className="au-c-drag-and-drop__target-image-placeholder" onClick={props.onClick}>
      {strings.addImg}
    </div>
  );
}

targetPlaceholder.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(targetPlaceholder);
