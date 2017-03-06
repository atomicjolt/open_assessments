import React      from 'react';

export default function dotLoader(props) {
  return (
    <div className="loader">{props.children}</div>
  );
}

dotLoader.propTypes = {
  children: React.PropTypes.node,
};
