import React            from 'react';
import _                from 'lodash';
import types            from '../../../../../constants/question_types';
import Editor           from '../../../common/oea_editor';
import Loader           from '../../../common/dot_loader';
import Selector         from './correct_selector';
import AnswerIcons      from './answer_icons';
import Feedback         from './option_feedback';
import localize         from '../../../../locales/localize';
import { languageText } from '../../../../../utils/utils';
import { getLanguage }  from '../../../../../constants/language_types';

function multipleChoiceOptions(props) {
  const strings = props.localizeStrings('multipleChoiceOptions');
  const feedbackText = languageText(props.feedbacks, props.language);
  const hideFeedback = (props.itemType !== types.multipleChoice) ||
    !(props.isActive || feedbackText);

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
  const text = _.get(props, `texts[${props.language}]`, '');
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
          editorKey={getLanguage(props.language)}
          textSize="small"
          isActive={props.isActive}
          fileIds={props.questionFileIds}
          placeholder={strings.optionText}
          text={text}
          bankId={props.bankId}
          onBlur={(text, fileIds) => props.updateChoice({ text }, fileIds)}
          language={props.language}
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
        feedbacks={props.feedbacks}
        bankId={props.bankId}
        itemId={props.itemId}
        updateChoice={props.updateChoice}
        fileIds={props.fileIds}
        hidden={hideFeedback}
        language={props.language}
      />
    </div>
  );
}

multipleChoiceOptions.propTypes = {
  setActiveChoice: React.PropTypes.func.isRequired,
  text: React.PropTypes.string,
  feedback: React.PropTypes.string,
  id: React.PropTypes.string,
  itemId: React.PropTypes.string,
  itemType: React.PropTypes.string,
  updateChoice: React.PropTypes.func.isRequired,
  deleteChoice: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
  moveUp: React.PropTypes.func.isRequired,
  moveDown: React.PropTypes.func.isRequired,
  setActiveChoice: React.PropTypes.func.isRequired,
  first: React.PropTypes.bool,
  last: React.PropTypes.bool,
  isCorrect: React.PropTypes.bool,
  shuffle: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
  bankId: React.PropTypes.string,
  questionFileIds: React.PropTypes.shape({}),
  fileIds: React.PropTypes.shape({}),
  language: React.PropTypes.string.isRequired,
  feedbacks: React.PropTypes.shape({})
};

export default localize(multipleChoiceOptions);
