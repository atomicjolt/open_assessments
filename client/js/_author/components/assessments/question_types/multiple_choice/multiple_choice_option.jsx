import React        from 'react';
import types        from '../../../../../constants/question_types';
import Editor       from '../../../common/oea_editor';
import Loader       from '../../../common/dot_loader';
import Selector     from './correct_selector';
import AnswerIcons  from './answer_icons';
import Feedback     from './option_feedback';

export default function multipleChoiceOptions(props) {
  const hideFeedback = props.itemType !== types.multipleChoice;

  if (props.id === 'new') {
    return (
      <div className={`author--c-answer ${props.isActive ? 'is-active' : ''}`}>
        <div className="author--c-input">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={`author--c-answer ${props.isActive ? 'is-active' : ''}`}>
      <div className="author--c-input">
        <Selector
          itemType={props.itemType}
          id={props.id}
          isCorrect={props.isCorrect}
          updateChoice={props.updateChoice}
        />
        <label htmlFor="option1" />
        <Editor
          text={props.text}
          bankId={props.bankId}
          itemId={props.itemId}
          onBlur={(text, fileIds) => props.updateChoice({ text }, fileIds)}
        />

        <AnswerIcons
          first={props.first}
          last={props.last}
          moveUp={props.moveUp}
          moveDown={props.moveDown}
          shuffle={props.shuffle}
          deleteChoice={props.deleteChoice}
        />
      </div>
      {
        hideFeedback ? null : (
          <Feedback
            feedback={props.feedback}
            bankId={props.bankId}
            itemId={props.itemId}
            updateChoice={props.updateChoice}
          />
        )
      }
    </div>
  );
}

multipleChoiceOptions.propTypes = {
  text: React.PropTypes.string,
  feedback: React.PropTypes.string,
  id: React.PropTypes.string,
  itemType: React.PropTypes.string,
  updateChoice: React.PropTypes.func.isRequired,
  deleteChoice: React.PropTypes.func.isRequired,
  moveUp: React.PropTypes.func.isRequired,
  moveDown: React.PropTypes.func.isRequired,
  first: React.PropTypes.bool,
  last: React.PropTypes.bool,
  isCorrect: React.PropTypes.bool,
  shuffle: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
  itemId: React.PropTypes.string,
  bankId: React.PropTypes.string,
};
