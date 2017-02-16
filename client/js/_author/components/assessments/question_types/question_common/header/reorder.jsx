import React    from 'react';

export default function inactiveHeader(props) {
  const hideUp = props.topItem ? 'is-hidden' : '';
  const hideDown = props.bottomItem ? 'is-hidden' : '';

  return (
    <div className="o-right c-question-icons c-question-icons--reorder">
      <button
        className={`c-btn c-btn--square ${hideUp}`}
        onClick={!props.topItem && props.moveUp}
      >
        <i className="material-icons">arrow_upward</i>
      </button>
      <button
        className={`c-btn c-btn--square ${hideDown}`}
        onClick={!props.bottomItem && props.moveDown}
      >
        <i className="material-icons">arrow_downward</i>
      </button>
      <button
        onClick={props.toggleReorder}
        className="c-btn c-btn--sm c-btn--white"
      > Done </button>
    </div>
  );
}

inactiveHeader.propTypes = {
  topItem: React.PropTypes.bool,
  bottomItem: React.PropTypes.bool,
  toggleReorder: React.PropTypes.func,
  moveUp: React.PropTypes.func,
  moveDown: React.PropTypes.func,
};
