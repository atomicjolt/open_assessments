import React      from 'react';

export default function feedback(props) {
  return (
    <div className="c-question__feedback">
      <div className="c-input c-input-label--left c-feedback">
        <label htmlFor="feedbackCorrect">Correct Feedback</label>
        <div className="c-input__contain">
          <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedbackCorrect" type="text" tabIndex="-1" />
          <div className="c-input__bottom" />
        </div>
      </div>
      <div className="c-input c-input-label--left c-feedback u-mt-sm">
        <label htmlFor="feedbackIncorrect">Incorrect Feedback</label>
        <div className="c-input__contain">
          <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedbackIncorrect" type="text" tabIndex="-1" />
          <div className="c-input__bottom" />
        </div>
      </div>
    </div>
  );
}

feedback.propTypes = {};
