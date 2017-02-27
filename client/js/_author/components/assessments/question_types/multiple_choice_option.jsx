import React      from 'react';

export default function multipleChoiceOptions(props) {
  return (
    <div className="c-answer is-active">
      <div className="c-input">
        <div className="c-radio">
          <input
            type="radio"
            id={`option_radio_${props.id}`}
            name="radio"
            tabIndex="0"
            checked={props.isCorrect}
            onClick={e => props.updateChoice({ isCorrect: e.target.checked })}
          />
          <label htmlFor={`option_radio_${props.id}`} />
        </div>

        <label htmlFor="option1" />
        <div className="c-input__contain">
          <input
            className="c-text-input c-text-input--small c-wysiwyg"
            defaultValue={props.text}
            onBlur={e => props.updateChoice({ text: e.target.value })}
            id="option1"
            type="text"
            placeholder="Option"
            tabIndex="0"
          />
          <div className="c-input__bottom" />
        </div>

        <div className="c-answer__icons">
          {
            props.first || props.shuffle ? <div className="c-answer__icons__spacer" /> : <button
              className="c-answer__icons__spacer"
              tabIndex="0"
              onClick={props.moveUp}
            >
              <i className="material-icons">arrow_upward</i>
            </button>
          }
          {
            props.last || props.shuffle ? <div className="c-answer__icons__spacer" /> : <button
              className="c-answer__icons__spacer"
              tabIndex="0"
              onClick={props.moveDown}
            >
              <i className="material-icons">arrow_downward</i>
            </button>
          }
          <button
            className="c-answer__icons__spacer"
            tabIndex="0"
            onClick={props.deleteChoice}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>

      {
        props.isActive ? (
          <div className="c-input c-input-label--left c-feedback">
            <label htmlFor="feedback1">Feedback</label>
            <div className="c-input__contain">
              <input
                defaultValue={props.feedback}
                onBlur={e => props.updateChoice({ feedback: e.target.value })}
                className="c-text-input c-text-input--smaller c-wysiwyg"
                id="feedback1"
                type="text"
                tabIndex="0"
              />
              <div className="c-input__bottom" />
            </div>
          </div>
        ) : null
      }
    </div>
  );
}

multipleChoiceOptions.propTypes = {
  text: React.PropTypes.string,
  feedback: React.PropTypes.string,
  id: React.PropTypes.string,
  updateItem: React.PropTypes.func.isRequired,
  updateChoice: React.PropTypes.func.isRequired,
  deleteChoice: React.PropTypes.func.isRequired,
  moveUp: React.PropTypes.func.isRequired,
  moveDown: React.PropTypes.func.isRequired,
  first: React.PropTypes.bool,
  last: React.PropTypes.bool,
  isCorrect: React.PropTypes.bool,
  shuffle: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
};
