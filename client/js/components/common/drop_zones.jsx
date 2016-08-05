import React            from 'react';
import { DropTarget }   from 'react-dnd';

import ItemTypes        from './draggable_item_types';

const groupWordTarget = {
  drop(props, monitor) {
    if(!monitor.didDrop()) {
      let items = [];

      switch(monitor.getItemType()) {
        case ItemTypes.WORD:
          items = [monitor.getItem().itemId];
          break;
        case ItemTypes.WORD_GROUP:
          items = _.map(monitor.getItem().words, 'id');
      }
      props.dropItem(items, monitor.getSourceClientOffset());
      return { items };
    }
  }
};

const wordTarget = {
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
		connectDropTarget: React.PropTypes.func.isRequired
	}
  render() {
    const { connectDropTarget, isOver, overClassName, className } = this.props;
    const zoneClassName = isOver && overClassName ? className + " " + overClassName : className;

    return connectDropTarget(
      <div className={zoneClassName} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export const GroupDropZone = DropTarget([ItemTypes.WORD_GROUP, ItemTypes.WORD], groupWordTarget, collect)(Dropzone);
export const WordDropZone = DropTarget(ItemTypes.WORD, wordTarget, collect)(Dropzone);
export const FillTheBlankWordDropZone = DropTarget(ItemTypes.FILL_BLANK_WORD, wordTarget, collect)(Dropzone);
