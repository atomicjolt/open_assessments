import React      from 'react';

export default function spinner(props) {
  return (
    <div className="spinner">{props.children}</div>
  );
}

spinner.propTypes = {
  children: React.PropTypes.node,
};
