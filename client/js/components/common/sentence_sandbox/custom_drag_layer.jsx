import React          from 'react';
import { DragLayer }  from 'react-dnd';

import ItemTypes      from '../draggable_item_types';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export class CustomDragLayer extends React.Component{
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
        return _.map(item.words, (word) => {
          return <span
            style={{background: "green", padding: "5px 5px", margin: "5px 5px"}}
            key={word.id}>
            {word.text}
          </span>
        });
      default:
        return <div></div>
    }
  }

  render() {
    console.log('rendered');
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
