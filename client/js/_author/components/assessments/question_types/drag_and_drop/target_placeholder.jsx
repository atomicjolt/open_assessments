import React    from 'react';

export default function targetPlaceholder(props) {

  // TODO: localization
  return (
    <div className="au-c-drag-and-drop__target-image-placeholder" onClick={props.onClick}>
      Add Target Image
    </div>
  );
}

targetPlaceholder.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};
