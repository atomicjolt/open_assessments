import React      from 'react';
import genusTypes from '../../../../../constants/genus_types';

export default function feedback(props) {
  return (
    <div className="c-question__feedback">
      <div className="c-input c-input-label--left c-feedback">
        <label htmlFor="feedbackCorrect">Feedback</label>
        <div className="c-input__contain">
          <input
            className="c-text-input c-text-input--smaller c-wysiwyg"
            id="feedbackCorrect"
            type="text"
            tabIndex="0"
            onBlur={(e) => props.updateItem({
              answers: [{
                genusTypeId: genusTypes.answer.rightAnswer,
                feedback: e.target.value
              }]
            })}/>
          <div className="c-input__bottom" />
        </div>
      </div>
    </div>
  );
}

feedback.propTypes = {
  updateItem: React.PropTypes.func.isRequired
};
