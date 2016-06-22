import React            from "react";
import { DragSource }   from "react-dnd";

import Word             from "./word";

export const ItemTypes = {
  WORD: "word"
}

const wordSource = {
  beginDrag(props) {
    return {
      wordId: props.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export class DraggableWord extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div style={{ opacity: isDragging ? 0 : 1, cursor: 'move' }}>
        <Word>
          {this.props.children}
        </Word>
      </div>
    );
  }
}

export default DragSource(ItemTypes.WORD, wordSource, collect)(DraggableWord);
