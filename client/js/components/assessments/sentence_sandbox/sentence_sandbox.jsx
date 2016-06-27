import React          from "react";
import { DragDropContext }  from 'react-dnd';
import HTML5Backend         from 'react-dnd-html5-backend';

import Word               from "../fill_the_blank_dnd/word";
import DraggableWord      from "../fill_the_blank_dnd/draggable_word";
import Dropzone           from "../fill_the_blank_dnd/dropzone";
import DraggableWordGroup from "./draggable_word_group";

const Words = {
  0: "asdf",
  1: "fdsa",
  2: "asdffdsa"
};

export class SentenceSandbox extends React.Component {
  constructor() {
    super();

    this.state = {
      wordChain: []
    };
  }
  render() {
    return return <div>
      <div>
        <h1>Words</h1>
        <ul>
          {_.map(_.omit(Words, this.state.wordChain), (word, wordId) => {
            return <li key={wordId}><DraggableWord id={wordId}>{word}</DraggableWord></li>
          })}
        </ul>
      </div>
      <div>
        <span>Start: </span>
        { _.map(this.state.wordChain() (wordId) => {

        })
          <Dropzone dropWord={(wordId) => { this.dropWord(wordId) }}>
            <span>{blank}</span>
          </Dropzone>
        }
      </div>
    </div>
  }
}

export default DragDropContext(HTML5Backend)(SentenceSandbox);
