import React      from 'react';

export default function feedback(props) {

  return (
    <div className="author--c-question__feedback">
      <div className="author--c-input author--c-input-label--left author--c-feedback">
        <label htmlFor="feedbackCorrect">
          {props.onlyShowCorrect ? 'Feedback' : 'Correct Feedback'}
        </label>
        <div className="author--c-input__contain">
          <input
            className="author--c-text-input author--c-text-input--smaller author--c-wysiwyg"
            id="feedbackCorrect"
            type="text"
            tabIndex="0"
            defaultValue={props.correct}
            onBlur={e => props.updateItem({ question: { correctFeedback: { text: e.target.value } } })}
          />
          <div className="author--c-input__bottom" />
        </div>
      </div>
      {
        props.onlyShowCorrect ? null : <div className="author--c-input author--c-input-label--left author--c-feedback author--u-mt-sm">
          <label htmlFor="feedbackIncorrect">Incorrect Feedback</label>
          <div className="author--c-input__contain">
            <input
              className="author--c-text-input author--c-text-input--smaller author--c-wysiwyg"
              id="feedbackIncorrect"
              type="text"
              tabIndex="0"
              defaultValue={props.incorrect}
              onBlur={e => props.updateItem({ question: { incorrectFeedback: { text: e.target.value } } })}
            />
            <div className="author--c-input__bottom" />
          </div>
        </div>
      }
    </div>
  );
}

feedback.propTypes = {
  onlyShowCorrect: React.PropTypes.bool,
};

