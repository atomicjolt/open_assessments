import React from 'react';

export default function SaveOption(props) {
  return (
    <button
      className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-md"
      onClick={props.save}
    >
      Save Options
    </button>
  );
}

SaveOption.propTypes = {
  save: React.PropTypes.func.isRequired,
};
