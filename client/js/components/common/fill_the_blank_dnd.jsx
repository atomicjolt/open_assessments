import React                from 'react'
import { DragDropContext }  from 'react-dnd';
import HTML5Backend         from 'react-dnd-html5-backend';

import { WordDropZone }     from "./drop_zones";
import DraggableWord        from "./draggable_word";
import Word                 from "./word";

export class FillTheBlankDnd extends React.Component {
  dropWord(answer) {
    this.props.selectAnswer(answer.id);
  }

  render() {
    let blank = " ______________";
    if(this.props.currentAnswer != null) {
      blank = <Word material={this.props.currentAnswer.material} />
    }

    return <div>
      <div>
        <h1>Words</h1>
        <ul>
          {_.map(_.reject(this.props.words, this.props.currentAnswer), (answer) => {
            return <li key={answer.id}>
              <DraggableWord id={answer.id} material={answer.material} />
            </li>
          })}
        </ul>
      </div>
      <div>
        <span>Fill in the blank:
          <WordDropZone dropItem={(answer) => { this.dropWord(answer) }}>
            <span>{blank}</span>
          </WordDropZone>
        </span>
      </div>
    </div>
  }
}

export default DragDropContext(HTML5Backend)(FillTheBlankDnd)
