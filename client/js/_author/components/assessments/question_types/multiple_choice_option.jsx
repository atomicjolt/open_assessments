import React      from 'react';
import Radio      from './question_common/option_radio';

export default function multipleChoiceOptions(props) {

  const selector = () => {
    // TODO: this is where I will put checkboxes
    if (props.itemType === 'multipleChoice') {
      return (
        <Radio
          id={props.id}
          isCorrect={props.isCorrect}
          updateChoice={props.updateChoice}
        />
      );
    }
    return null;
  };

  return (
    <div className="author--c-answer is-active">
      <div className="author--c-input">
        {selector()}
        <label htmlFor="option1" />
        <div className="author--c-input__contain">
          <input
            className="author--c-text-input author--c-text-input--small author--c-wysiwyg"
            defaultValue={props.text}
            onBlur={e => props.updateChoice({ text: e.target.value })}
            id="option1"
            type="text"
            placeholder="Option"
            tabIndex="0"
          />
          <div className="author--c-input__bottom" />
        </div>

        <div className="author--c-answer__icons">
          {
            props.first || props.shuffle ? <div className="author--c-answer__icons__spacer" /> : <button
              className="author--c-answer__icons__spacer"
              tabIndex="0"
              onClick={props.moveUp}
            >
              <i className="material-icons">arrow_upward</i>
            </button>
          }
          {
            props.last || props.shuffle ? <div className="author--c-answer__icons__spacer" /> : <button
              className="author--c-answer__icons__spacer"
              tabIndex="0"
              onClick={props.moveDown}
            >
              <i className="material-icons">arrow_downward</i>
            </button>
          }
          <button
            className="author--c-answer__icons__spacer"
            tabIndex="0"
            onClick={props.deleteChoice}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>

      {
        props.isActive ? (
          <div className="author--c-input author--c-input-label--left author--c-feedback">
            <label htmlFor="feedback1">Feedback</label>
            <div className="author--c-input__contain">
              <input
                defaultValue={props.feedback}
                onBlur={e => props.updateChoice({ feedback: e.target.value })}
                className="author--c-text-input author--c-text-input--smaller author--c-wysiwyg"
                id="feedback1"
                type="text"
                tabIndex="0"
              />
              <div className="author--c-input__bottom" />
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
  itemType: React.PropTypes.string,
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
