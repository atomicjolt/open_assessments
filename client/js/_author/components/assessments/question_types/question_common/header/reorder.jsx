import React    from 'react';

export default class InactiveHeader extends React.Component {
  static propTypes = {
    topItem: React.PropTypes.bool,
    bottomItem: React.PropTypes.bool,
    preview: React.PropTypes.bool,
    togglePreview: React.PropTypes.func,
    toggleReorder: React.PropTypes.func,
    moveUp: React.PropTypes.func,
    moveDown: React.PropTypes.func,
  };

  componentDidMount() {
    this.header.scrollIntoView();
  }

  done() {
    if (this.props.preview) {
      this.props.togglePreview();
    } else {
      this.props.toggleReorder();
    }
  }

  buttons() {
    if (this.props.preview) { return null; }

    const hideUp = this.props.topItem ? 'is-hidden' : '';
    const hideDown = this.props.bottomItem ? 'is-hidden' : '';

    return (
      <div>
        <button
          className={`au-c-btn au-c-btn--square ${hideUp}`}
          onClick={!this.props.topItem && this.props.moveUp}
        >
          <i className="material-icons">arrow_upward</i>
        </button>
        <button
          className={`au-c-btn au-c-btn--square ${hideDown}`}
          onClick={!this.props.bottomItem && this.props.moveDown}
        >
          <i className="material-icons">arrow_downward</i>
        </button>
      </div>
    );
  }

  render() {
    return (
      <div ref={ref => (this.header = ref)} className="au-o-right au-c-question-icons au-c-question-icons--reorder">
        {this.buttons()}
        <button
          onClick={() => this.done()}
          className="au-c-btn au-c-btn--sm au-c-btn--white"
        > Done </button>
      </div>
    );
  }
}
