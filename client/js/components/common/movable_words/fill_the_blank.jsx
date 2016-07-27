import React                  from "react";
import ReactDOM               from "react-dom";
import { DragDropContext }    from 'react-dnd';
import HTML5Backend           from 'react-dnd-html5-backend';

import DraggableWord          from "../draggable_word";
import { GroupDropZone }      from "../drop_zones";
import { WordDropZone }      from "../drop_zones";
import FillTheBlankWordChain  from "./fill_the_blank_word_chain";
import CustomDragLayer        from "./custom_drag_layer";

export class FillTheBlank extends React.Component {
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
      if(_.includes(this.props.selectedAnswer, answerId)) {
        this.props.selectAnswer(answerId);
      }
    });

    let answerPositions = _.cloneDeep(this.state.answerPositions);

    const groupDropZone = ReactDOM.findDOMNode(this.groupDropZone);
    const groupDropZonePosition = groupDropZone.getBoundingClientRect();

    _.each(answerIds, (answerId, index) => {
      answerPositions[answerId] = {
        top: dropOffset.y - groupDropZonePosition.top,
        left: dropOffset.x + index * 60 - groupDropZonePosition.left
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

    /* We split the question on the interaction placeholders, then render
       dropzones where the interactions would be.

       Alternatively we could render invisible dropzones over the top of styled
       placeholders, but that would require checking if anything has changed
       in componentDidUpdate, and if so finding the placeholders after rendering
       then absolutely positioning an invisible dropzone over the styled
       placeholder.
    */

    const sentenceChunks = this.props.question.split("<div class=\"interaction-placeholder\"></div>")

    // range is times two minus 1 so that we have the correct spaces for the dropzones.
    const wordChain = _.map(_.range(0, (sentenceChunks.length * 2) - 1), (index) => {
      if(index % 2 == 0) {
        return <div key={index} dangerouslySetInnerHTML={{__html: sentenceChunks[index / 2]}}></div>
      } else if(!_.isEmpty(this.props.selectedAnswer)) {
        const answer = answersById[this.props.selectedAnswer[0]];

        return <DraggableWord
          key={`${answer.id}-${index}`}
          id={answer.id}
          material={answer.material}
        />
      }

      return <WordDropZone key={index} style={{ display: "inline-block" }} dropItem={(answerId) => { this.linkWord(answerId) }}>
        <div className="end-drop-zone" style={{display: "inline-block", height: 23, width: 50, background: "grey"}}/>
      </WordDropZone>
    });

    const availableWords = _.map(_.omit(answersById, this.props.selectedAnswer), (answer) => {
      let style = {}
      if(this.state.answerPositions[answer.id]) {
        style = {position: "absolute", ...this.state.answerPositions[answer.id]}
      }
      return <DraggableWord
        style={style}
        key={answer.id}
        id={answer.id}
        material={answer.material}
      />
    });

    return <div>
      <GroupDropZone
        ref={(ref) => this.groupDropZone = ref}
        dropItem={(answerIds, dropOffset) => {this.dropWordsInCloud(answerIds, dropOffset)}}
        style={{width: 500, height: 200, border: "1px solid grey", position: "relative"}}
      >
        <h1>Word Cloud</h1>
        {availableWords}
      </GroupDropZone>
      <div>
        {wordChain}
      </div>
      <CustomDragLayer />
    </div>
  }
}

export default DragDropContext(HTML5Backend)(FillTheBlank);
