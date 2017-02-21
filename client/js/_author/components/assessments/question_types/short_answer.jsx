import React from 'react';
import _     from 'lodash';

function getBoxSize(lines) {
  if (!lines || lines < 3) return 'small';
  if (lines < 5) return 'medium';
  return 'large';
}

function getBoxLines(size) {
  if (!size || size === 'small') return 1;
  if (size === 'medium') return 3;
  return 5;
}

export default function ShortAnswer(props) {
  const { question } = props.item;
  const lines = question && question.expectedLines;

  function updateItem(e) {
    props.updateItem({ question: { expectedLines: getBoxLines(e.target.value) } });
  }

  return (
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
