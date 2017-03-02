import React    from 'react';

export default function breadcrumbs(props) {
  const { name, id } = props;
  return (
    <span className="author--o-flex-center">
      <span className="author--c-breadcrumb__divider">/</span>
      <button
        className={props.current ? 'author--c-btn author--c-btn--breadcrumb is-active' : 'author--c-btn author--c-btn--breadcrumb'}
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
