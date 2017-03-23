import React             from 'react';
import { DragSource }    from 'react-dnd';

import ItemTypes         from '../draggable_item_types';

const droppableSource = {
  beginDrag(props, monitor, component) {
    const bounds = component.node.getBoundingClientRect();
    return {
      height: bounds.height,
      width: bounds.width,
      droppable: props.droppable,
      previousZoneIndex: props.zoneIndex,
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export class DraggableWord extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string,
    className: React.PropTypes.string,
    hide: React.PropTypes.bool,
    style: React.PropTypes.shape({}),
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
    const hide = this.props.hide || isDragging ? 'is-hidden' : '';
    return connectDragSource(
      <div
        ref={ref => (this.node = ref)}
        className={`${this.props.className || ''} ${hide}`}
        style={this.props.style}
        dangerouslySetInnerHTML={{ __html: this.props.text }}
      />
    );
  }
}

export default DragSource(ItemTypes.CLIX_DROPPABLE, droppableSource, collect)(DraggableWord);
1687
