import React    from 'react';
import localize from '../../../../../locales/localize';

class ReorderHeader extends React.Component {
  static propTypes = {
    topItem: React.PropTypes.bool,
    bottomItem: React.PropTypes.bool,
    toggleReorder: React.PropTypes.func,
    moveUp: React.PropTypes.func,
    moveDown: React.PropTypes.func,
    localizeStrings: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.header.scrollIntoView();
  }

  render() {
    const hideUp = this.props.topItem ? 'is-hidden' : '';
    const hideDown = this.props.bottomItem ? 'is-hidden' : '';
    const strings = this.props.localizeStrings('reorderHeader');
    return (
      <div ref={ref => (this.header = ref)} className="au-o-right au-c-question-icons au-c-question-icons--reorder">
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
        <button
          onClick={this.props.toggleReorder}
          className="au-c-btn au-c-btn--sm au-c-btn--white"
        >{strings.done}</button>
      </div>
    );
  }
}

export default localize(ReorderHeader);
