import React               from 'react';
import { WordDropZone }    from '../drop_zones';
import DraggableGroupWord  from './draggable_group_word';

export default class WordChain extends React.Component {
  constructor() {
    super();
    this.state = {
      draggingIndex: null
    }
  }

  beginDragging(wordIndex) {
    this.setState({dragging: true, draggingIndex: wordIndex});
  }

  endDragging() {
    this.setState({dragging: false, draggingIndex: null});
  }

  render() {
    return <div style={{display: "inline-block"}}>
      <div className="start-block" style={{display: "inline-block", width: 10, height: 23, background: "black"}} />
      {_.map(this.props.wordChain, (answerId, index) => {
          const answer = this.props.answersById[answerId];

          const draggableWords = _.map(this.props.wordChain.slice(index), (draggableAnswerId) => {
            return this.props.answersById[draggableAnswerId];
          });

          return <DraggableGroupWord
            id={answerId}
            wordType={this.props.answersById[answerId].wordType}
            key={answerId}
            isGroupDragging={this.state.dragging && index >= this.state.draggingIndex}
            draggableWords={draggableWords}
            beginDragging={() => { this.beginDragging(index) }}
            endDragging={() => { this.endDragging() }}>
            <span>{this.props.answersById[answerId].text}</span>
          </DraggableGroupWord>
        })
      }
      <WordDropZone style={{ display: "inline-block" }} dropItem={(answerId) => { this.props.linkWord(answerId) }}>
        <div className="end-drop-zone" style={{display: "inline-block", height: 23, width: 50, background: "grey"}}/>
      </WordDropZone>
    </div>
  }
}
