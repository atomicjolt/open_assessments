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

export class Droppable extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string,
    hide: React.PropTypes.bool,
    showWhileDragging: React.PropTypes.bool,
    style: React.PropTypes.shape({}),
    droppable: React.PropTypes.shape({
      text: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    })
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isDragging, droppable, showWhileDragging } = this.props;
    const hide = this.props.hide || (isDragging && !showWhileDragging) ? 'is-hidden' : '';

    return connectDragSource(
      <div
        ref={ref => (this.node = ref)}
        className={`${this.props.className || ''} ${hide}`}
        style={this.props.style}
        dangerouslySetInnerHTML={{ __html: droppable.text }}
      />
    );
  }
}

export default DragSource( // eslint-disable-line new-cap
  ItemTypes.CLIX_DROPPABLE,
  droppableSource,
  collect
)(Droppable);
