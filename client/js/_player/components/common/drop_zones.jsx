import React            from 'react';
import { DropTarget }   from 'react-dnd';
import _                from 'lodash';

import ItemTypes        from './draggable_item_types';

const groupWordTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      let items = [];

      switch (monitor.getItemType()) {
        case ItemTypes.WORD:
          items = [monitor.getItem().itemId];
          break;
        case ItemTypes.WORD_GROUP:
          items = _.map(monitor.getItem().words, 'id');
          break;
        default:
      }
      props.dropItem(items, monitor.getSourceClientOffset());
      return { items };
    }

    return null;
  }
};

const defaultTarget = {
  drop(props, monitor) {
    props.dropItem(monitor.getItem().itemId);
    return monitor.getItem();
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export class Dropzone extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool,
    overClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    style: React.PropTypes.shape({}),
  }

  render() {
    const { connectDropTarget, isOver, overClassName, className } = this.props;
    const zoneClassName = className + (isOver && overClassName ? ` ${overClassName}` : '');
    return connectDropTarget(
      <div className={zoneClassName} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export const WordDropZone = DropTarget( // eslint-disable-line new-cap
  ItemTypes.WORD,
  defaultTarget,
  collect
)(Dropzone);

export const GroupDropZone = DropTarget( // eslint-disable-line new-cap
  [ItemTypes.WORD_GROUP, ItemTypes.WORD],
  groupWordTarget,
  collect
)(Dropzone);

export const FillTheBlankWordDropZone = DropTarget( // eslint-disable-line new-cap
  ItemTypes.FILL_BLANK_WORD,
  defaultTarget,
  collect
)(Dropzone);
