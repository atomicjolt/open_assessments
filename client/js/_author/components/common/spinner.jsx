import React      from 'react';

export default function dotLoader(props) {
  return (
    <div className="spinner">{props.children}</div>
  );
}

dotLoader.propTypes = {
  children: React.PropTypes.node,
};
