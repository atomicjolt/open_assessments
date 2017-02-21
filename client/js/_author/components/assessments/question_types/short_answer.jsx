import React    from 'react';
import _        from 'lodash';
import Feedback from './question_common/feedback';

const BOX_SIZES = {
  small: {
    expectedLines: 1,
    expectedLength: 50,
    maxStrings: 1,
  },
  medium: {
    expectedLines: 3,
    expectedLength: 500,
    maxStrings: 1,
  },
  large: {
    expectedLines: 5,
    expectedLength: 500,
    maxStrings: 1,
  }
};

function getBoxSize(lines) {
  return _.findKey(BOX_SIZES, boxSize => lines === boxSize.expectedLines) || 'large';
}

export default function ShortAnswer(props) {
  const { question } = props.item;
  const lines = question && question.expectedLines;

  function updateItem(e) {
    props.updateItem({
      question: { ...BOX_SIZES[e.target.value] }
    });
  }

  return (
    <div>
      <div className="c-question__answers c-short-answer__answers">
        <div className="c-dropdown c-dropdown--medium c-input-label--top">
          <label htmlFor="short-answer-size">Answer Box</label>
          <select
            value={getBoxSize(lines)}
            onChange={e => updateItem(e)}
            id="short-answer-size"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className={`c-short-answer__example is-${getBoxSize(lines)}`}>
          <span>{_.capitalize(getBoxSize(lines))} Box</span>
        </div>
      </div>

      <Feedback />
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
