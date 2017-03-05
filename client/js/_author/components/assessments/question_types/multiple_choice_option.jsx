import React      from 'react';
import _          from 'lodash';
import Radio      from './question_common/option_radio';
import CheckBox   from './question_common/option_checkbox';
import types      from '../../../../constants/question_types';
import Editor  from '../../common/oea_editor';

export default function multipleChoiceOptions(props) {
  const selector = () => {
    // The null is for reflection questions
    if (_.includes([types.reflection, types.multipleReflection], props.itemType)) { return null; }
    if (props.itemType === types.multipleAnswer) {
      return (
        <CheckBox
          id={props.id}
          isCorrect={props.isCorrect}
          updateChoice={props.updateChoice}
        />
      );
    }
    return (
      <Radio
        id={props.id}
        isCorrect={props.isCorrect}
        updateChoice={props.updateChoice}
      />
    );
  };

  return (
    <div className={`author--c-answer ${props.isActive ? 'is-active' : ''}`}>
      <div className="author--c-input">
        {selector()}
        <label htmlFor="option1" />
        <Editor
          text={props.text}
          bankId={props.bankId}
          itemId={props.itemId}
          onBlur={(text, fileIds) => props.updateChoice({ text }, fileIds)}
        />

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
        // TODO: extract to own component
        props.itemType === types.multipleChoice ? (
          <div className="author--c-input author--c-input-label--left author--c-feedback">
            <label htmlFor="feedback1">Feedback</label>
            <Editor
              text={props.feedback}
              bankId={props.bankId}
              itemId={props.itemId}
              onBlur={(text, fileIds) => props.updateChoice({ feedback: text }, fileIds)}
            />
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
  multipleAnswer: React.PropTypes.bool,
  itemId: React.PropTypes.string,
  bankId: React.PropTypes.string,
};
