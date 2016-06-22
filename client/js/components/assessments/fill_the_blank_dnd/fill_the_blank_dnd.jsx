import React                from 'react'
import { DragDropContext }  from 'react-dnd';
import HTML5Backend         from 'react-dnd-html5-backend';

import Dropzone             from "./dropzone";
import DraggableWord        from "./draggable_word";
import Word                 from "./word";

const Words = {
  0: "asdf",
  1: "fdsa",
  2: "asdffdsa"
}

export class FillTheBlankDnd extends React.Component {
  constructor() {
    super();
    this.state = {
      filledWord: null
    };
  }

  dropWord(wordId) {
    this.setState({ filledWord: wordId });
  }

  render() {
    let blank = " ______________"
    if(this.state.filledWord != null) {
      blank = <Word>{Words[this.state.filledWord]}</Word>
    }

    return <div>
      <div>
        <h1>Words</h1>
        <ul>
          {_.map(_.omit(Words, this.state.filledWord), (word, wordId) => {
            return <li key={wordId}><DraggableWord id={wordId}>{word}</DraggableWord></li>
          })}
        </ul>
      </div>
      <div>
        <span>Fill in the blank:
          <Dropzone dropWord={(wordId) => { this.dropWord(wordId) }}>
            <span>{blank}</span>
          </Dropzone>
        </span>
      </div>
    </div>
  }
}

export default DragDropContext(HTML5Backend)(FillTheBlankDnd)
