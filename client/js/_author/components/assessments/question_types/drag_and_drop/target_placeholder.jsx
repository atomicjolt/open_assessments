import React    from 'react';

export default function targetPlaceholder(props) {

  return (
    <div className="" onClick={props.onClick}>
      Add Target
    </div>
  );
}

targetPlaceholder.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};
