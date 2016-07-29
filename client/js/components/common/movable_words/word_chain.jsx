import React               from 'react';
import ReactDOM            from 'react-dom';

import { WordDropZone }    from '../drop_zones';
import DraggableGroupWord  from './draggable_group_word';
import StartWord           from './start_word';

export default class WordChain extends React.Component {
  constructor() {
    super();

    // wrapLines is an array of wrapping indexes, one for each line.
    // The start is the index of the first block that line renders from
    // this.props.wordChain

    this.state = {
      draggingIndex: null,
      wrapLines: [
        { start: 0 }
      ]
    }
  }

  componentDidReceiveProps(nextProps) {

  }

  beginDragging(wordIndex) {
    this.setState({dragging: true, draggingIndex: wordIndex});
  }

  endDragging() {
    this.setState({dragging: false, draggingIndex: null});
  }

  componentDidUpdate() {
    const dropZone = ReactDOM.findDOMNode(this.WordDropZone);
    const dimensions = dropZone.getBoundingClientRect();
    if(dimensions.right - dimensions.left < 100) {
      const wrapLine = { start: this.props.wordChain.length };
      this.setState({ wrapLines: this.state.wrapLines.push(wrapLine) });
    }
  }

  render() {
    const lines = _.map(this.state.wrapLines, (wrapLine, index) => {
      let endWordIndex = this.props.wordChain.length;
      if(this.state.wrapLines[index + 1]) {
        endWordIndex = this.state.wrapLines[index + 1].start;
      }

      let words = _.slice(this.props.wordChain, wrapLine.start, endWordIndex);
      words = words.map((answerId, wordIndex) => {
        const answer = this.props.answersById[answerId];

        const draggableWords = _.at(this.props.answersById, this.props.wordChain.slice(wordIndex));

        return <DraggableGroupWord
          id={answerId}
          key={answerId}
          isGroupDragging={this.state.dragging && wordIndex >= this.state.draggingIndex}
          draggableWords={draggableWords}
          beginDragging={() => { this.beginDragging(wordIndex) }}
          endDragging={() => { this.endDragging() }}
          material={answer.material}
        />
      });

      let className = "c-word-answers";
      if(index < (this.state.wrapLines.length - 1) ) {
        className += " c-word-answers--split-top";
      } else if( this.state.wrapLines.length > 1 ){
        className += " c-word-answers--split-bottom";
      }

      return <div className={className}>
        <div className="c-word c-word--starter" />
        {words}
        <WordDropZone ref={(ref) => { this.WordDropZone = ref; }} style={{minWidth: "100px", minHeight: "100px"}} dropItem={(answerId) => { this.props.linkWord(answerId) }} />
      </div>

    });

    return <div className="c-answers">
      { lines }
    </div>
  }
}
