import React    from 'react';
import localize from '../../locales/localize';

function backButton(props) {
  const strings = props.localizeStrings('backButton');
  return (
    <button
      onClick={() => props.handleClick()}
      className="au-c-btn au-c-btn--sm au-c-btn--outline au-c-btn--back"
    >
      <i className="material-icons">keyboard_arrow_left</i>
      {strings.back}
    </button>
  );
}


backButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(backButton);
