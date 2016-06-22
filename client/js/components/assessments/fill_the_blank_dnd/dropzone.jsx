import React from "react";
import { DropTarget } from "react-dnd";

import { ItemTypes } from "./draggable_word"

const blankTarget = {
  drop(props, monitor) {
    props.dropWord(monitor.getItem().wordId);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export class Dropzone extends React.Component {
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <span>
        {this.props.children}
      </span>
    );
  }
}

export default DropTarget(ItemTypes.WORD, blankTarget, collect)(Dropzone)
