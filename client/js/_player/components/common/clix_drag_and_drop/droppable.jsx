import React              from 'react';
import { DragSource }     from 'react-dnd';
import { getEmptyImage }  from 'react-dnd-html5-backend';
import ItemTypes          from '../draggable_item_types';

const droppableSource = {
  beginDrag(props, monitor, component) {
    const bounds = component.node.getBoundingClientRect();
    const body = document.getElementsByTagName('body')[0];
    body.className = 'dragging';
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
    connectDragPreview: connect.dragPreview(),
  };
}

export class DraggableWord extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string,
    className: React.PropTypes.string,
    hide: React.PropTypes.bool,
    style: React.PropTypes.shape({}),
    droppable: React.PropTypes.shape({
      text: React.PropTypes.string,
    })
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    const hide = this.props.hide || isDragging ? 'is-hidden' : '';
    return connectDragSource(
      <div
        ref={ref => (this.node = ref)}
        className={`${this.props.className || ''} ${hide}`}
        style={this.props.style}
        dangerouslySetInnerHTML={{ __html: this.props.droppable.text }}
      />
    );
  }
}

export default DragSource(ItemTypes.CLIX_DROPPABLE, droppableSource, collect)(DraggableWord);
