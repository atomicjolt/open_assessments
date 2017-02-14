import React      from 'react';

export default function multipleChoiceOptions(props) {
  return (
    <div className="c-answer is-active">
      <div className="c-input">
        <div className="c-radio">
          <input type="radio" id="radio" name="radio" tabIndex="0" />
          <label htmlFor="radio" />
        </div>

        <label htmlFor="option1" />
        <div className="c-input__contain">
          <input
            className="c-text-input c-text-input--small c-wysiwyg"
            value={props.text}
            onChange={e => props.updateChoice({ id: props.id, text: e.target.value })}
            onBlur={() => props.updateItem()}
            id="option1"
            type="text"
            placeholder="Option"
            tabIndex="0"
          />
          <div className="c-input__bottom" />
        </div>

        <div className="c-answer__icons">
          <button className="c-answer__icons__spacer" tabIndex="0">
            <i className="material-icons">arrow_upward</i>
          </button>
          <button className="c-answer__icons__spacer" tabIndex="0">
            <i className="material-icons">arrow_downward</i>
          </button>
          <button className="c-answer__icons__spacer" tabIndex="0">
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>

      <div className="c-input c-input-label--left c-feedback">
        <label htmlFor="feedback1">Feedback</label>
        <div className="c-input__contain">
          <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedback1" type="text" tabIndex="0" />
          <div className="c-input__bottom" />
        </div>
      </div>
    </div>
  );
}

multipleChoiceOptions.propTypes = {
  text: React.PropTypes.string,
  updateItem: React.PropTypes.func.isRequired,
};
