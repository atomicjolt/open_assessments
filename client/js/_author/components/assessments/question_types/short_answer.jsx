import React          from 'react';
import _              from 'lodash';
import SingleFeedback from './question_common/single_feedback';

const BOX_SIZES = {
  small: {
    expectedLines: 1,
    expectedLength: 50,
    maxStrings: 1,
  },
  medium: {
    expectedLines: 1,
    expectedLength: 200,
    maxStrings: 1,
  },
  large: {
    expectedLines: 5,
    expectedLength: 200,
    maxStrings: 1,
  }
};

function getBoxSize(lines, length) {
  return _.findKey(BOX_SIZES, boxSize => (
    lines === boxSize.expectedLines && length === boxSize.expectedLength
  )) || 'large';
}

function updateItem(e, update) {
  update({
    question: { ...BOX_SIZES[e.target.value] }
  });
}

export default function ShortAnswer(props) {
  const { question } = props.item;
  const lines = question && question.expectedLines;
  const length = question && question.expectedLength;
  const boxSize = getBoxSize(lines, length);

  return (
    <div>
      <div className="author--c-question__answers author--c-short-answer__answers">
        <div className="author--c-dropdown author--c-dropdown--medium author--c-input-label--top">
          <label htmlFor="short-answer-size">Answer Box</label>
          <select
            value={boxSize}
            onChange={e => updateItem(e, props.updateItem)}
            id="short-answer-size"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className={`author--c-short-answer__example is-${boxSize}`}>
          <span>{_.capitalize(boxSize)} Box</span>
        </div>
      </div>

      <SingleFeedback
        item={props.item}
        updateItem={props.updateItem}
      />
    </div>
  );
}

ShortAnswer.propTypes = {
  item: React.PropTypes.shape({
    question: React.PropTypes.shape({
      lines: React.PropTypes.number
    })
  }),
  updateItem: React.PropTypes.func.isRequired
};
