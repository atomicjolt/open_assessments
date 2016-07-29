import React             from "react";
import { DragSource }    from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

import Word              from "./word";
import ItemTypes         from "./draggable_item_types";

const wordSource = {
  beginDrag(props) {
    return {
      itemId: props.id,
      material: props.material
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  }
}

export class DraggableWord extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { style, connectDragSource, isDragging } = this.props;
    const baseStyle = { display: "inline-block", opacity: isDragging ? 0 : 1, cursor: 'move' };

    return connectDragSource(
      <div className="draggable-word" style={{ ...style, ...baseStyle}}>
        <Word hide={this.props.hide} material={this.props.material} />
      </div>
    );
  }
}

export default DragSource(ItemTypes.WORD, wordSource, collect)(DraggableWord);
