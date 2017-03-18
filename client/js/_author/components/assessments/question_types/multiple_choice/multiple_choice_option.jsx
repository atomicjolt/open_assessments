import React        from 'react';
import types        from '../../../../../constants/question_types';
import Editor       from '../../../common/oea_editor';
import Loader       from '../../../common/dot_loader';
import Selector     from './correct_selector';
import AnswerIcons  from './answer_icons';
import Feedback     from './option_feedback';

export default function multipleChoiceOptions(props) {
  const hideFeedback = (props.itemType !== types.multipleChoice) ||
    !(props.isActive || props.feedback);

  if (props.id === 'new') {
    return (
      <div className={`au-c-answer ${props.isActive ? 'is-active' : ''}`}>
        <div className="au-c-input">
          <Loader />
        </div>
      </div>
    );
  }

  const isActive = props.isActive ? 'is-active' : '';
  const isOrdered = props.shuffle ? 'is-ordered' : '';

  return (
    <div
      onFocus={() => props.setActiveChoice(props.id)}
      onClick={() => props.setActiveChoice(props.id)}
      className={`au-c-answer ${isActive} ${isOrdered}`}
    >
      <div className="au-c-input">
        <Selector
          itemType={props.itemType}
          id={props.id}
          itemId={props.itemId}
          isCorrect={props.isCorrect}
          updateChoice={props.updateChoice}
        />
        <label htmlFor="option1" />
        <Editor
          textSize="small"
          isActive={props.isActive}
          fileIds={props.questionFileIds}
          placeholder="Option Text"
          text={props.text}
          bankId={props.bankId}
          uploadScopeId={props.itemId}
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
      <Feedback
        feedback={props.feedback}
        bankId={props.bankId}
        itemId={props.itemId}
        updateChoice={props.updateChoice}
        fileIds={props.fileIds}
        hidden={hideFeedback}
      />
    </div>
  );
}

multipleChoiceOptions.propTypes = {
  text: React.PropTypes.string,
  feedback: React.PropTypes.string,
  id: React.PropTypes.string,
  itemId: React.PropTypes.string,
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
  questionFileIds: React.PropTypes.shape({}),
  fileIds: React.PropTypes.shape({}),
};
