import React from 'react';

export default function BackButton(props) {
  return (
    <button
      onClick={() => props.handleClick()}
      className="au-c-btn au-c-btn--sm au-c-btn--outline au-c-btn--back"
    >
      <i className="material-icons">keyboard_arrow_left</i>
        Back
    </button>
  );
}


BackButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
};
