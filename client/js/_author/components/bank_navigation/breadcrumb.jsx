import React    from 'react';

export default function breadcrumbs(props) {
  const { name, id } = props;
  return (
    <span className="o-flex-center">
      <span className="c-breadcrumb__divider">/</span>
      <button
        className={props.current ? 'c-btn c-btn--breadcrumb is-active' : 'c-btn c-btn--breadcrumb'}
        onClick={() => props.updatePath(id, name)}
      >
        {name}
      </button>
    </span>
  );
}

breadcrumbs.propTypes = {
  name        : React.PropTypes.string.isRequired,
  id          : React.PropTypes.string.isRequired,
  current     : React.PropTypes.bool.isRequired,
  updatePath  : React.PropTypes.func.isRequired,
};
