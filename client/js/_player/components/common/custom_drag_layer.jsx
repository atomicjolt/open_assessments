import React          from 'react';
import { DragLayer }  from 'react-dnd';
import _              from 'lodash';

import ItemTypes      from './draggable_item_types';
import Word           from './word';
import Droppable      from './clix_drag_and_drop/droppable';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
  const { initialOffset, currentOffset, currentClientOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }
  let x;
  let y;

  if (props.itemType === ItemTypes.CLIX_DROPPABLE) {
    x = currentClientOffset.x - (props.item.width / 2);
    y = currentClientOffset.y - (props.item.height / 2);
  } else {
    x = currentOffset.x;
    y = currentOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    currentClientOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export class CustomDragLayer extends React.Component {
  static propTypes = {
    item: React.PropTypes.object,
    itemType: React.PropTypes.string,
    initialOffset: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }),
    currentOffset: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }),
    isDragging: React.PropTypes.bool.isRequired
  };

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.WORD_GROUP:
        return _.map(item.words, word => (
          <Word key={word.id} material={word.material} className={item.wordClassName} />
        ));
      case ItemTypes.FILL_BLANK_WORD:
      case ItemTypes.WORD:
        return <Word key={item.itemId} material={item.material} className={item.wordClassName} />;
      case ItemTypes.CLIX_DROPPABLE:
        return (
          <Droppable
            key={item.droppableId}
            className="c-droppable-item"
            text={item.droppableText}
            droppableId={item.droppableId}
          />
        );
      default:
        return <div />;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

export default DragLayer(collect)(CustomDragLayer);
