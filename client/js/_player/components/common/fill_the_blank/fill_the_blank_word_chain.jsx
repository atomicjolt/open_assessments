import React                            from 'react';
import _                                from 'lodash';

import { FillTheBlankDraggableWord }    from '../draggable_word';
import { FillTheBlankWordDropZone }     from '../drop_zones';
import Word                             from '../word';

export default class FillTheBlankWordChain extends React.Component {
  static propTypes = {
    linkWord       : React.PropTypes.func.isRequired,
    sentenceWords  : React.PropTypes.array.isRequired,
    selectedAnswer : React.PropTypes.array
  }

  getWords(words) {
    return words.map((wordHtml, wordIndex) => {
      if (wordHtml.indexOf('interaction-placeholder') >= 0) {
        if (!_.isEmpty(this.props.selectedAnswer)) {
          return (
            <div
              className="c-blank-drop-zone"
              key={`${this.props.selectedAnswer.id}-${wordIndex}`}
            >
              <FillTheBlankDraggableWord
                id={this.props.selectedAnswer.id}
                material={this.props.selectedAnswer.material}
                wordClassName="c-word c-word--blank"
              />
            </div>
          );
        } else {
          return (
            <FillTheBlankWordDropZone
              className="c-blank-drop-zone"
              key={wordIndex}
              dropItem={(answerId) => { this.props.linkWord(answerId); }}
            >
              <div className="c-blank" />
            </FillTheBlankWordDropZone>
          );
        }
      }

      return (
        <Word
          className="c-word c-word--fill"
          key={wordIndex} material={wordHtml} />
      );
    });
  }

  render() {
    return (
      <div className="c-blank-answers">
        {this.getWords(this.props.sentenceWords)}
      </div>
    );
  }
}
