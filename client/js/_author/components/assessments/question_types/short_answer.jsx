import React from 'react';

export default function ShortAnswer(props) {
  return (
    <div className="c-question__answers c-short-answer__answers">
      <div className="c-dropdown c-dropdown--medium c-input-label--top">
        <label htmlFor="short-answer-size">Answer Box</label>
        <select id="short-answer-size">
          <option value="1">Small</option>
          <option value="3">Medium</option>
          <option value="5">Large</option>
        </select>
      </div>

      <div className="c-short-answer__example is-large">
        <span>Small Box</span>
      </div>
    </div>
  );
}

ShortAnswer.propTypes = {
  item: React.PropTypes.shape({}),
  updateItem: React.PropTypes.func.isRequired
};
