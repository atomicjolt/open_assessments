import React             from "react";
import { DragSource }    from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

import Word              from "./word";
import ItemTypes         from "./draggable_item_types";

const wordSource = {
  beginDrag(props) {
    return {
      itemId: props.id,
      material: props.material,
      wordClassName: props.wordClassName
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
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div style={{ display: "inline-block" }}>
        <Word
          hide={this.props.hide || isDragging}
          material={this.props.material}
          className={this.props.wordClassName}
        />
      </div>
    );
  }
}

export default DragSource(ItemTypes.WORD, wordSource, collect)(DraggableWord);
export const FillTheBlankDraggableWord = DragSource(ItemTypes.FILL_BLANK_WORD, wordSource, collect)(DraggableWord);
