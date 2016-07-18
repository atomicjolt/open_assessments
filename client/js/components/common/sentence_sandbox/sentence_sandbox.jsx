import React                from "react";
import ReactDOM             from "react-dom";
import { DragDropContext }  from 'react-dnd';
import HTML5Backend         from 'react-dnd-html5-backend';

import DraggableWord        from "../draggable_word";
import { GroupDropZone }    from "../drop_zones";
import WordChain            from "./word_chain";
import CustomDragLayer      from "./custom_drag_layer";

export class SentenceSandbox extends React.Component {
  static propTypes = {
    answers: React.PropTypes.array,
    wordChain: React.PropTypes.array,
    selectAnswer: React.PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      answerPositions: {}
    };
  }

  dropWordsInCloud(answerIds, dropOffset) {
    _.each(answerIds, (answerId) => {
      if(_.includes(this.props.wordChain, answerId)) {
        this.props.selectAnswer(answerId);
      }
    });

    let answerPositions = _.cloneDeep(this.state.answerPositions);

    _.each(answerIds, (answerId, index) => {
      answerPositions[answerId] = {
        top: dropOffset.y,
        left: dropOffset.x + index * 60
      };

      this.setState({answerPositions});
    });
  }

  linkWord(answerId) {
    this.props.selectAnswer(answerId);
  }

  render() {
    const answersById = {};

    _.each(this.props.answers, (answer) => {
      answersById[answer.id] = answer
    })

    const availableWords = _.map(_.omit(answersById, this.props.wordChain), (answer) => {
      let style = {}
      if(this.state.answerPositions[answer.id]) {
        style = {position: "absolute", ...this.state.answerPositions[answer.id]}
      }
      return <DraggableWord
        wordType={answer.wordType}
        style={style}
        key={answer.id}
        id={answer.id}
      >
        {answer.text}
      </DraggableWord>
    });

    return <div>
      <GroupDropZone
        dropItem={(answerIds, dropOffset) => {this.dropWordsInCloud(answerIds, dropOffset)}}
        style={{width: 500, height: 200, border: "1px solid grey"}}
      >
        <h1>Word Cloud</h1>
        {availableWords}
      </GroupDropZone>
      <div>
        <span>Start: </span>
        <div style={{height: 500, width: 500, background: "light-grey"}}>
          <WordChain
            linkWord={(answerId) => { this.linkWord(answerId); }}
            answersById={answersById}
            wordChain={this.props.wordChain}
          />
        </div>
      </div>
      <CustomDragLayer />
    </div>
  }
}

export default DragDropContext(HTML5Backend)(SentenceSandbox);
