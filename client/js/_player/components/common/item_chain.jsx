import React                    from 'react';
import ReactDOM                 from 'react-dom';
import _                        from 'lodash';
import { WordDropZone }         from './drop_zones';
import DraggableGroupWord       from './movable_words/draggable_group_word';
import { beginWrap, endWrap }   from '../../../constants/icons';

export default class ItemChain extends React.Component {
  static propTypes = {
    linkWord: React.PropTypes.func.isRequired,
    wordChain: React.PropTypes.array.isRequired,
    answersById: React.PropTypes.object.isRequired
  }

  constructor() {
    super();

    // wrapIndexes is an array of wrapping indexes, one for each line.
    // The start is the index of the first block that line renders from
    // this.props.wordChain

    this.state = {
      draggingIndex: null,
      wrapIndexes: [0]
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(nextProps.wordChain, this.props.wordChain)) {
      if(nextProps.wordChain.length > this.props.wordChain.length) {
        const dropZone = ReactDOM.findDOMNode(this.WordDropZone);
        const dimensions = dropZone.getBoundingClientRect();

        if(dimensions.right - dimensions.left < 100) {
          const wrapIndex = this.props.wordChain.length;
          this.setState({ wrapIndexes: this.state.wrapIndexes.concat(wrapIndex) });
        }
      } else if(nextProps.wordChain.length < this.props.wordChain.length) {
        let wrapIndexes = _.dropRightWhile(this.state.wrapIndexes, (wrapIndex) => {
          return wrapIndex >= this.state.draggingIndex && wrapIndex > 0;
        })

        this.setState({ wrapIndexes });
      }
    }
  }

  componentDidUpdate() {
    // When we update, we need to check if the dropzone is now too small, and
    // if it is wrap to a new line.
    const dropZone = ReactDOM.findDOMNode(this.WordDropZone);
    const dimensions = dropZone.getBoundingClientRect();

    if(dimensions.right - dimensions.left < 10) {
      const wrapIndex = this.props.wordChain.length;
      this.setState({ wrapIndexes: this.state.wrapIndexes.concat(wrapIndex) });
    }
  }

  beginDragging(wordIndex) {
    this.setState({dragging: true, draggingIndex: wordIndex});
  }

  endDragging() {
    this.setState({dragging: false, draggingIndex: null});
  }

  getLines() {
    return _.map(this.state.wrapIndexes, (wrapIndex, index) => {
      // Get the index of the first word on the next line
      let endWordIndex = this.props.wordChain.length;
      if(this.state.wrapIndexes[index + 1]) {
        endWordIndex = this.state.wrapIndexes[index + 1];
      }

      // get the word Ids to show on this line
      let words = _.slice(this.props.wordChain, wrapIndex, endWordIndex);

      words = words.map((answerId, wordIndex) => {
        const answer = this.props.answersById[answerId];

        // get all of the words that will need to be dragged with this word
        const draggableWords = _.at(this.props.answersById, this.props.wordChain.slice(wordIndex + wrapIndex));

        return <DraggableGroupWord
          wordClassName={this.props.itemClassName}
          id={answerId}
          key={answerId}
          isGroupDragging={this.state.dragging && (wordIndex + wrapIndex) >= this.state.draggingIndex}
          draggableWords={draggableWords}
          beginDragging={() => { this.beginDragging(wordIndex + wrapIndex) }}
          endDragging={() => { this.endDragging() }}
          material={answer.material}
        />
      });

      // We are assuming we will only wrap onto two lines at most
      let lineClassName = this.props.answerBoxClassName;
      let startBlockClassName = "c-word c-word--starter";
      let svg = <div></div>
      let wordDropZone = <WordDropZone
        className="c-drop-zone"
        ref={(ref) => { this.WordDropZone = ref; }}
        dropItem={(answerId) => { this.props.linkWord(answerId) }}
        overClassName="c-over-drop-zone"
      />

      if(this.state.wrapIndexes.length > 1) {
        if(index === 0) {
          svg = beginWrap;
          lineClassName += " c-word-answers--split-top";
          wordDropZone = <div></div>;
        } else {
          svg = endWrap;
          startBlockClassName += " u-hide";
          lineClassName += " c-word-answers--split-bottom";
        }
      }

      let startBlock = <div className={startBlockClassName} />;

      if(this.props.noStartBlock) {
        startBlock = <div></div>;
      }

      return <div key={wrapIndex} className={lineClassName}>
        {svg}
        {startBlock}
        {words}
        {wordDropZone}
      </div>

    });
  }

  render() {
    const lines = this.getLines();

    return <div>
      { lines }
    </div>
  }
}
