import React             from 'react';
import { DragSource }    from 'react-dnd';

import ItemTypes         from '../draggable_item_types';

const wordSource = {
  beginDrag(props) {
    return props.droppable;
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
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
    const hide = this.props.hide || isDragging ? 'is-hidden' : '';
    return connectDragSource(
      <div
        className={`${this.props.className} ${hide}`}
        dangerouslySetInnerHTML={{ __html: this.props.text }}
      />
    );
  }
}

export default DragSource(ItemTypes.CLIX_DROPPABLE, wordSource, collect)(DraggableWord);
