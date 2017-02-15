import React      from 'react';

export default function feedback(props) {
  return (
    <div className="c-question__feedback">
      <div className="c-input c-input-label--left c-feedback">
        <label htmlFor="feedbackCorrect">Feedback</label>
        <div className="c-input__contain">
          <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedbackCorrect" type="text" tabIndex="0" />
          <div className="c-input__bottom" />
        </div>
      </div>
    </div>
  );
}
