import React                            from 'react';
import ReactDOM                         from 'react-dom';

import { FillTheBlankDraggableWord }    from '../draggable_word';
import { FillTheBlankWordDropZone }     from '../drop_zones';
import Word                             from '../word';
import { beginWrap, endWrap }           from '../../../constants/icons';

export default class FillTheBlankWordChain extends React.Component {
  static propTypes = {
    linkWord: React.PropTypes.func.isRequired,
    sentenceWords: React.PropTypes.array.isRequired,
    selectedAnswer: React.PropTypes.object
  }

  constructor() {
    super();

    this.state = {
      wrapIndexes: [0]
    }

    this.wordRefs = {};
  }

  componentDidMount() {
    // We are doing this because for some reason the words have not finished
    // rendering when componentDidMount is called, so we cannot correctly
    // calculate the widths of the words. A 10ms set timeout is enough time.
    setTimeout(() => { this.wrapLines() }, 10);
  }

  componentDidUpdate() {
    this.wrapLines();
  }

  wrapLines() {
    const lastWord = this.refs[`word-${this.props.sentenceWords.length - 1}`]
    const lastWordDOMNode = ReactDOM.findDOMNode(lastWord);
    const answerBox = ReactDOM.findDOMNode(this.refs["answer-box"]);
    const lastWordRight = lastWordDOMNode.getBoundingClientRect().right;
    const answerBoxRight = answerBox.getBoundingClientRect().right;

    if (lastWordRight > answerBoxRight) {
      let wordRight = lastWordRight;
      let i = this.props.sentenceWords.length - 1;

      while(wordRight > answerBoxRight) {
        const word = ReactDOM.findDOMNode(this.refs[`word-${--i}`]);
        wordRight = word.getBoundingClientRect().right;
      }

      this.setState({ wrapIndexes: this.state.wrapIndexes.concat(i + 1) });
    }
  }

  getLines() {
    return _.map(this.state.wrapIndexes, (wrapIndex, index) => {
      // Get the index of the first word on the next line
      let endWordIndex = this.props.sentenceWords.length;
      if(this.state.wrapIndexes[index + 1]) {
        endWordIndex = this.state.wrapIndexes[index + 1];
      }

      // get the word Ids to show on this line
      let words = _.slice(this.props.sentenceWords, wrapIndex, endWordIndex);

      words = words.map((wordHtml, wordIndex) => {
        if(wordHtml.indexOf("interaction-placeholder") >= 0) {
          if(!_.isEmpty(this.props.selectedAnswer)) {
            return <div key={`${this.props.selectedAnswer.id}-${wordIndex + wrapIndex}`} className="c-blank-drop-zone">
              <FillTheBlankDraggableWord
                ref={`word-${wordIndex + wrapIndex}`}
                id={this.props.selectedAnswer.id}
                material={this.props.selectedAnswer.material}
                wordClassName="c-word"
              />
            </div>
          } else {
            return <FillTheBlankWordDropZone
                ref={`word-${wordIndex + wrapIndex}`}
                className="c-blank-drop-zone"
                key={wordIndex + wrapIndex}
                dropItem={(answerId) => { this.props.linkWord(answerId) }}
              >
                <div className="c-blank" />
              </FillTheBlankWordDropZone>
          }
        } else

        return <Word
          ref={`word-${wordIndex + wrapIndex}`}
          className="c-word"
          key={wordIndex + wrapIndex} material={wordHtml}
        />
      });

      // We are assuming we will only wrap onto two lines at most
      let lineClassName = "c-word-answers";
      let startBlockClassName = "c-word c-word--starter";
      let svg = <div></div>
      let answerBoxRef = "answer-box";
      if(this.state.wrapIndexes.length > 1) {
        if(index === 0) {
          svg = beginWrap;
          lineClassName += " c-word-answers--split-top";
          answerBoxRef = "answer-box-line-1"
        } else {
          svg = endWrap;
          startBlockClassName += " u-hide";
          lineClassName += " c-word-answers--split-bottom";
          answerBoxRef = "answer-box"
        }
      }

      return <div ref={answerBoxRef} key={wrapIndex} className={lineClassName}>
        {svg}
        <div className={startBlockClassName} />
        {words}
      </div>

    });
  }

  render() {
    return <div>
      {this.getLines()}
    </div>
  }
}
