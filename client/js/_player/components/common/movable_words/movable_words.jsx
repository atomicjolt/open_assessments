import React                from "react";
import ReactDOM             from "react-dom";
import _                    from "lodash";

import withDragDropContext  from "../with_drag_drop_context";
import DraggableWord        from "../draggable_word";
import { GroupDropZone }    from "../drop_zones";
import ItemChain            from "../item_chain";
import CustomDragLayer      from "../custom_drag_layer";

export class MovableWords extends React.Component {
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
  }

  linkWord(answerId) {
    this.props.selectAnswer(answerId);
  }

  render() {
    const answersById = {};

    _.each(this.props.answers, (answer) => {
      answersById[answer.id] = answer;
    });

    const availableWords = _.map(answersById, (answer) => {
      return (
        <DraggableWord
            key={answer.id}
            id={answer.id}
            material={answer.material}
            hide={_.includes(this.props.wordChain, answer.id)}
            wordClassName={this.props.itemClassName}/>
      );
    });

    return (
      <div dir="ltr">
        <div className="c-word-box">
          <GroupDropZone
              ref={(ref) => this.groupDropZone = ref}
              dropItem={(answerIds, dropOffset) => { this.dropWordsInCloud(answerIds, dropOffset); }}
              className="c-word-box__contain">
            {availableWords}
          </GroupDropZone>
        </div>
        <ItemChain
            linkWord={(answerId) => { this.linkWord(answerId); }}
            answersById={answersById}
            wordChain={this.props.wordChain}
            itemClassName={this.props.itemClassName}
            answerBoxClassName={this.props.answerBoxClassName}
            noStartBlock={this.props.noStartBlock}/>
        <CustomDragLayer/>
      </div>
    );
  }
}

export default withDragDropContext(MovableWords);
// This is code to absolutely position words in the word cloud when they are dragged.
// We are not sure that MIT wants this, currently we are just hiding the words
// and displaying all of them inline-block

// let answerPositions = _.cloneDeep(this.state.answerPositions);
//
// const dropZone = ReactDOM.findDOMNode(this.FillTheBlankWordDropZone);
// const dropZonePosition = dropZone.getBoundingClientRect();
//
// _.each(answerIds, (answerId, index) => {
//   answerPositions[answerId] = {
//     top: dropOffset.y - dropZonePosition.top,
//     left: dropOffset.x + index * 60 - dropZonePosition.left
//   };
//
//   this.setState({answerPositions});
// });

// To apply the position styles to the words, style them like so:
// let style = {}
// if(this.state.answerPositions[answer.id]) {
//   style = {position: "absolute", ...this.state.answerPositions[answer.id]}
// }
