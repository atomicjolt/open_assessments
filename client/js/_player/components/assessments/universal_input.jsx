import React from 'react';
import _     from 'lodash';

import AudioUpload              from '../common/audio_upload';
import CheckBox                 from '../common/checkbox';
import DragAndDrop              from '../common/drag_and_drop';
import FileUpload               from '../common/file_upload';
import ClixDragAndDrop          from '../common/clix_drag_and_drop/clix_drag_and_drop';
import MovableWordsFillTheBlank from '../common/fill_the_blank/fill_the_blank';
import MappedImage              from '../common/mapped_image';
import Matching                 from '../common/matching';
import MovableWords             from '../common/movable_words/movable_words';
import Option                   from '../common/option';
import RadioButton              from '../common/radio_button';
import SentenceSandbox          from '../common/sentence_sandbox';
import TextField                from '../common/text_field';

export const CORRECT = 'CORRECT';
export const INCORRECT = 'INCORRECT';
export const UNGRADED = 'UNGRADED';

export default class UniversalInput extends React.Component {

  static propTypes = {
    // Assessment configuration settings. these should never be modified.
    settings: React.PropTypes.object,

    // Item to be displayed
    item: React.PropTypes.object.isRequired,

    selectAnswer: React.PropTypes.func,

    // Whether or not entire question should be disabled
    isResult: React.PropTypes.bool,

    // Array of selected answer IDs
    response: React.PropTypes.array,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object,

    // Actions to trigger when recordings are started or stopped
    audioRecordStart: React.PropTypes.func,
    audioRecordStop: React.PropTypes.func
  }

  wasSelected(id) {
    if (this.props.response) {
      return this.props.response.indexOf(id) > -1;
    }

    return null;
  }

  render() {
    const props = this.props;
    const item = props.item;
    let answerInputs;

    switch (item.question_type) {

      case 'edx_multiple_choice':
      case 'multiple_choice_question':
      case 'true_false_question':
      case 'survey_question': {
        const multipleChoiceAnswer = (answer) => {
          const selectRadio = _.partialRight(props.selectAnswer, true);
          const id = `${item.id}_${answer.id}`;

          return (
            <RadioButton
              isDisabled={props.isResult}
              key={id}
              id={id}
              item={answer}
              isHtml={item.isHtml}
              name="answer-radio"
              checked={this.wasSelected(answer.id)}
              selectAnswer={selectRadio}
            />
          );
        };

        answerInputs = _.chunk(item.answers, 2).map(row => (
          <ul key={`${item.id}_row_${row[0].id}`} className="o-grid">
            {row.map(multipleChoiceAnswer)}
          </ul>
        ));
        break;
      }
      case 'edx_dropdown':
        answerInputs = item.answers.map(answer => (
          <Option
            isDisabled={props.isResult}
            key={`${item.id}_${answer.id}`}
            item={answer}
            name="answer-option"
          />
        ));
        break;
      case 'matching_question':
        answerInputs = (
          <Matching
            isDisabled={props.isResult}
            item={item}
            name="answer-option"
          />
        );
        break;
      case 'edx_numerical_input':
      case 'edx_text_input':
        answerInputs = item.answers.map(answer => (
          <TextField
            isDisabled={props.isResult}
            key={`${item.id}_${answer.id}`}
            item={answer}
            name="answer-text"
          />
        ));
        break;
      case 'text_input_question':
      case 'text_only_question':
      case 'short_answer_question':
        answerInputs = (
          <div className="c-text-answer">
            <textarea
              placeholder="Enter answer here..."
              onBlur={e => props.selectAnswer(e.target.value, true)}
              rows={parseInt(props.item.question_meta.expectedLines, 10) || 1}
            />
          </div>
        );
        break;
      case 'numerical_input_question':
        answerInputs = (
          <div className="c-text-answer">
            <textarea
              placeholder="Enter answer here..."
              onBlur={e => props.selectAnswer(e.target.value, true)}
              rows={parseInt(props.item.question_meta.expectedLines, 10) || 1}
            />
          </div>
        );
        break;
      case 'multiple_answers_question': {
        const multipleAnswer = (answer) => {
          const selectCheckbox = _.partialRight(props.selectAnswer, false);
          const id = `${item.id}_${answer.id}`;

          return (
            <CheckBox
              isDisabled={props.isResult}
              key={id}
              id={id}
              item={answer}
              isHtml={item.isHtml}
              checked={this.wasSelected(answer.id)}
              selectAnswer={selectCheckbox}
            />
          );
        };

        answerInputs = _.chunk(item.answers, 2).map(row => (
          <ul key={`${item.id}_row_${row[0].id}`} className="o-grid">
            {row.map(multipleAnswer)}
          </ul>
        ));
        break;
      }
      case 'edx_image_mapped_input':
        answerInputs = item.answers.map(answer => (
          <MappedImage key={`${item.id}_${answer.id}`} item={answer} />
        ));
        break;
      case 'edx_drag_and_drop':
        answerInputs = item.answers.map(answer => (
          <DragAndDrop key={`${item.id}_${answer.id}`} item={answer} />
        ));
        break;
      case 'file_upload_question': {
        const selectFileUploadAnswer = _.partialRight(props.selectAnswer, true);
        answerInputs = (
          <FileUpload
            localizedStrings={this.props.localizedStrings.fileUpload}
            selectAnswer={selectFileUploadAnswer}
          />
        );
        break;
      }
      case 'audio_upload_question': {
        const selectAudioAnswer = _.partialRight(props.selectAnswer, true);
        answerInputs = (
          <AudioUpload
            localizedStrings={this.props.localizedStrings.audioUpload}
            selectAnswer={selectAudioAnswer}
            timeout={this.props.settings.audio_recorder_timeout}
            audioRecordStart={this.props.audioRecordStart}
            audioRecordStop={this.props.audioRecordStop}
          />
        );
        break;
      }
      case 'movable_object_chain': {
        const selectAnswer = _.partialRight(props.selectAnswer, false);
        answerInputs = (
          <MovableWords
            answers={item.answers}
            selectAnswer={selectAnswer}
            wordChain={props.response}
            itemClassName="c-object"
            answerBoxClassName="c-object-answers"
            noStartBlock
          />
        );
        break;
      }
      case 'movable_words_sentence': {
        const selectAnswer = _.partialRight(props.selectAnswer, false);
        answerInputs = (
          <MovableWords
            answers={item.answers}
            selectAnswer={selectAnswer}
            wordChain={props.response}
            itemClassName="c-word"
            answerBoxClassName="c-word-answers"
          />
        );
        break;
      }
      case 'movable_words_sandbox': {
        const selectAnswer = _.partialRight(props.selectAnswer, false);
        // Movable words sandbox stores both audio files, and word id's in global
        // state. Grab only the word id's for the word chain.
        const words = props.response.filter(rItem => typeof rItem === 'string');
        answerInputs = (
          <SentenceSandbox
            answers={item.answers}
            selectAnswer={selectAnswer}
            wordChain={words}
            localizedStrings={this.props.localizedStrings.audioUpload}
            timeout={this.props.settings.audio_recorder_timeout}
            itemClassName="c-word"
            answerBoxClassName="c-word-answers"
            audioRecordStart={this.props.audioRecordStart}
            audioRecordStop={this.props.audioRecordStop}
          />
        );
        break;
      }
      case 'fill_the_blank_question': {
        const selectAnswer = _.partialRight(props.selectAnswer, false);

        answerInputs = (
          <MovableWordsFillTheBlank
            answers={item.answers}
            sentenceWithBlank={item.question_meta.fillTheBlankSentence}
            selectAnswer={selectAnswer}
            selectedAnswer={props.response}
          />
        );
        break;
      }

      case 'clix_drag_and_drop': {
        const selectAnswer = _.partialRight(props.selectAnswer, false);

        answerInputs = (
          <ClixDragAndDrop
            answers={item.answers}
            zones={item.question_meta.zones}
            targets={item.question_meta.targets}
            selectAnswer={selectAnswer}
            selectedAnswers={props.response}
          />
        );
        break;
      }
      default:
        answerInputs = undefined;
    }

    return (
      <div>
        {answerInputs}
      </div>
    );
  }
}
