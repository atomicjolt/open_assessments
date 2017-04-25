import _                              from "lodash";
import React                          from "react";
import ReactDOM                       from "react-dom";

import withDragDropContext            from "../with_drag_drop_context";
import { FillTheBlankDraggableWord }  from "../draggable_word";
import { FillTheBlankWordDropZone }   from "../drop_zones";
import { WordDropZone }               from "../drop_zones";
import CustomDragLayer                from "../custom_drag_layer";
import FillTheBlankWordChain          from "./fill_the_blank_word_chain";

export class FillTheBlank extends React.Component {
  static propTypes = {
    answers: React.PropTypes.array,
    selectedAnswer: React.PropTypes.array,
    selectAnswer: React.PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      answerPositions: {}
    };
  }

  dropWordInCloud(answerId, dropOffset) {
    if(_.includes(this.props.selectedAnswer, answerId)) {
      this.props.selectAnswer(answerId);
    }
  }

  linkWord(answerId) {
    this.props.selectAnswer(answerId);
  }

  render() {

    const answersById = {};

    _.each(this.props.answers, (answer) => {
      answersById[answer.id] = answer;
    });

    /*
     * We split the question on the interaction placeholders, then render
     * dropzones where the interactions would be.
     *
     * Alternatively we could render invisible dropzones over the top of styled
     * placeholders, but that would require checking if anything has changed in
     * componentDidUpdate, and if so finding the placeholders after rendering
     * then absolutely positioning an invisible dropzone over the styled
     * placeholder.
     */

    const availableWords = _.map(answersById, (answer) => {
      return <FillTheBlankDraggableWord
                 key={answer.id}
                 id={answer.id}
                 material={answer.material}
                 hide={_.includes(this.props.selectedAnswer, answer.id)}
                 wordClassName="c-word c-word--blank"/>;
    });

    return (
      <div dir="ltr">
        <div className="c-word-box">
          <FillTheBlankWordDropZone
              ref={(ref) => this.FillTheBlankWordDropZone = ref}
              dropItem={(answerId, dropOffset) => { this.dropWordInCloud(answerId, dropOffset); }}
              className="c-word-box__contain">
            {availableWords}
          </FillTheBlankWordDropZone>
        </div>
        <div>
          <FillTheBlankWordChain
              sentenceWords={this.props.sentenceWithBlank}
              selectedAnswer={answersById[_.first(this.props.selectedAnswer)]}
              linkWord={(answerId) => { this.linkWord(answerId); }}/>
        </div>
        <CustomDragLayer/>
      </div>
    );
  }
}

export default withDragDropContext(FillTheBlank);
