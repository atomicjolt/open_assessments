import React    from 'react';

export default function answerIcons(props) {

  const spacer = <div className="author--c-answer__icons__spacer" />;
  const upButton = (
    <button
      className="author--c-answer__icons__spacer"
      tabIndex="0"
      onClick={props.moveUp}
    >
      <i className="material-icons">arrow_upward</i>
    </button>
  );
  const downButton = (
    <button
      className="author--c-answer__icons__spacer"
      tabIndex="0"
      onClick={props.moveDown}
    >
      <i className="material-icons">arrow_downward</i>
    </button>
  );

  return (
    <div className="author--c-answer__icons">
      { props.first || props.shuffle ? spacer : upButton }
      { props.last || props.shuffle ? spacer : downButton }
      <button
        className="author--c-answer__icons__spacer"
        tabIndex="0"
        onClick={props.deleteChoice}
      >
        <i className="material-icons">close</i>
      </button>
    </div>
  );
}

answerIcons.propTypes = {
  first: React.PropTypes.bool,
  last: React.PropTypes.bool,
  moveUp: React.PropTypes.func.isRequired,
  moveDown: React.PropTypes.func.isRequired,
  shuffle: React.PropTypes.bool,
  deleteChoice: React.PropTypes.func.isRequired,
};
