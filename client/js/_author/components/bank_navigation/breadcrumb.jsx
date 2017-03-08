import React    from 'react';

export default function breadcrumbs(props) {
  const { name, id } = props;
  return (
    <span className="au-o-flex-center">
      <span className="au-c-breadcrumb__divider">/</span>
      <button
        className={props.current ? 'au-c-btn au-c-btn--breadcrumb is-active' : 'au-c-btn au-c-btn--breadcrumb'}
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
