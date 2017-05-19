import React        from 'react';
import { connect }  from 'react-redux';
import _            from 'lodash';

import * as ItemActions           from '../../../../actions/qbank/items';
import MovableFillBlank           from './movable_fill_blank/movable_fill_blank';
import MultipleChoice             from './multiple_choice/multiple_choice';
import QuestionHeader             from './question_common/header/_header';
import Settings                   from './question_common/settings';
import QuestionText               from './question_common/text';
import AudioUpload                from './audio_upload';
import FileUpload                 from './file_upload';
import ImageSequence              from './image_sequence/_image_sequence';
import ShortAnswer                from './short_answer';
import WordSentence               from './movable_word_sentence/movable_word_sentence';
import MovableWordSandbox         from './movable_words_sandbox/movable_words_sandbox';
import DragAndDrop                from './drag_and_drop/_drag_and_drop';
import types                      from '../../../../constants/question_types';
import { languages, getLanguage } from '../../../../constants/language_types';
import Preview                    from './preview_question';
import { bankMedia }              from '../../../selectors/media';
import localize                   from '../../../locales/localize';
import { languageText }           from '../../../../utils/utils';

function select(state, props) {
  return {
    media: bankMedia(state, props),
  };
}

export class Question extends React.Component {
  static propTypes = {
    bankId: React.PropTypes.string.isRequired,
    item: React.PropTypes.shape({
      id: React.PropTypes.string,
      type: React.PropTypes.string,
      isRemoving: React.PropTypes.bool,
      bankId: React.PropTypes.string,
      name: React.PropTypes.string,
      question: React.PropTypes.shape({
        choices: React.PropTypes.shape({}),
      }),
    }).isRequired,
    isActive: React.PropTypes.bool,
    itemIndex: React.PropTypes.number,
    topItem: React.PropTypes.bool,
    bottomItem: React.PropTypes.bool,
    reorderActive: React.PropTypes.bool,
    updateItem: React.PropTypes.func.isRequired,
    activateItem: React.PropTypes.func.isRequired,
    toggleReorder: React.PropTypes.func.isRequired,
    createChoice: React.PropTypes.func.isRequired,
    deleteAssessmentItem: React.PropTypes.func.isRequired,
    moveItem: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
  };

  static questionComponents = {
    [types.audioUpload]: AudioUpload,
    [types.fileUpload]: FileUpload,
    [types.movableFillBlank]: MovableFillBlank,
    [types.movableWordSandbox]: MovableWordSandbox,
    [types.movableWordSentence]: WordSentence,
    [types.multipleAnswer]: MultipleChoice,
    [types.multipleChoice]: MultipleChoice,
    [types.multipleReflection]: MultipleChoice,
    [types.reflection]: MultipleChoice,
    [types.shortAnswer]: ShortAnswer,
    [types.fileUpload]: FileUpload,
    [types.audioUpload]: AudioUpload,
    [types.movableWordSandbox]: MovableWordSandbox,
    [types.movableWordSentence]: WordSentence,
    [types.dragAndDrop]: DragAndDrop,
    [types.imageSequence]: ImageSequence,
  };

  static stateDrivenTypes = [
    types.movableWordSentence,
    types.imageSequence,
  ];

  constructor(props) {
    super(props);
    this.state = {
      reorderActive: false,
      language: languages.languageTypeId.english,
      preview: false,
      activeChoice: null,
      item: {
        question: {
          choices: {}
        }
      }
    };
  }

  getClassName() {
    if (this.props.isActive && (this.props.reorderActive || this.state.preview)) {
      return 'reorder-active';
    }

    return this.props.isActive ? 'is-active' : '';
  }

  moveQuestionUp() {
    this.props.moveItem(this.props.itemIndex, this.props.itemIndex - 1);
  }

  moveQuestionDown() {
    this.props.moveItem(this.props.itemIndex, this.props.itemIndex + 1);
  }

  updateItem(newItemProperties, forceSkipState) {
    const { item } = this.props;
    if (newItemProperties.language && this.state.language !== newItemProperties.language) {
      this.setState({ language: newItemProperties.language });
    } else if (_.includes(Question.stateDrivenTypes, item.type) && !forceSkipState) {
      this.setState({ ...item, ...newItemProperties });
    } else {
      this.props.updateItem(this.props.bankId, {
        id: item.id,
        language: newItemProperties.language || this.state.language,
        ...newItemProperties
      });
    }
  }

  updateChoice(itemId, choiceId, choice, fileIds, type) {
    const { item } = this.props;
    const updateAttributes = {
      id: itemId,
      question: {
        [type || 'choices']: {
          [choiceId]: choice,
        },
        fileIds,
      }
    };
    if (_.includes(Question.stateDrivenTypes, item.type)) {
      this.setState({ item: _.merge(this.state.item, updateAttributes) });
    } else {
      this.updateItem(updateAttributes);
    }
  }

  saveStateItem() {
    const { item } = this.props;
    const saveItem = _.cloneDeep(this.state.item);
    saveItem.id = item.id;
    saveItem.language = this.state.language;
    this.props.updateItem(this.props.bankId, saveItem);
  }

  changeType(type) {
    // The choices: {} is to make sure the deserializer updates the choice and answer data
    this.props.updateItem(this.props.bankId, {
      id: this.props.item.id,
      type,
      question: {
        type,
        choices: {},
      },
      language: this.state.language
    });
  }

  makeReflection() {
    const { item } = this.props;
    let type = 'multipleChoice';
    if (item.type === types.multipleChoice) {
      type = types.reflection;
    } else if (item.type === types.reflection) {
      type = types.multipleChoice;
    } else if (item.type === types.multipleReflection) {
      type = types.multipleAnswer;
    } else if (item.type === types.multipleAnswer) {
      type = types.multipleReflection;
    }
    this.changeType(type);
  }

  makeMultipleAnswer() {
    const { item } = this.props;
    let type = 'multipleChoice';
    if (item.type === types.multipleChoice) {
      type = types.multipleAnswer;
    } else if (item.type === types.reflection) {
      type = types.multipleReflection;
    } else if (item.type === types.multipleReflection) {
      type = types.reflection;
    } else if (item.type === types.multipleAnswer) {
      type = types.multipleChoice;
    }
    this.changeType(type);
  }

  selectChoice(choiceId) {
    this.setState({ activeChoice: choiceId });
  }

  getDuplicateAnswers() {
    const itemType = this.props.item.type;
    if (!_.includes(Question.stateDrivenTypes, itemType)) { return []; }

    const propChoices = this.props.item.question.choices;
    const stateChoices = this.state.item.question.choices;

    return _({})
      .merge(propChoices, stateChoices)
      .map(itemType === 'imageSequence' ? 'order' : 'answerOrder')
      .groupBy()
      .pickBy(x => x.length > 1)
      .keys()
      .value();
  }

  blurOptions(e) {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) ||
        (currentTarget === document.activeElement)
      ) {
        this.selectChoice(null);
      }
    }, 0);
  }

  deleteChoice(choice) {
    const strings = this.props.localizeStrings('question');
    const { item } = this.props;
    if (confirm(strings.confirm)) {
      this.updateItem({
        question: {
          choices: this.markedForDeletion(choice)
        }
      }, true);
      if (_.includes(Question.stateDrivenTypes, item.type)
        && _.get(this, `state.item.question.choices[${choice.id}]`)) {
        const choices = this.state.item.question.choices;
        delete choices[choice.id];
        this.setState({ item: _.merge(this.state.item, { question: { choices } }) });
      }
    }
  }

  markedForDeletion(choice) {
    const newChoices = _.cloneDeep(this.props.item.question.choices);
    const toDelete = newChoices[choice.id];
    toDelete.delete = true;
    return { [toDelete.id]: toDelete };
  }

  content() {
    const { bankId, item } = this.props;
    const Component = Question.questionComponents[this.props.item.type];
    if (Component) {
      return (
        <Component
          item={_.merge(item, this.state.item)}
          updateItem={(newProps, forceSkipState) => this.updateItem(newProps, forceSkipState)}
          updateChoice={(itemId, choiceId, choice, fileIds, type) =>
            this.updateChoice(itemId, choiceId, choice, fileIds, type)}
          isActive={this.props.isActive}
          activeChoice={this.state.activeChoice}
          selectChoice={choiceId => this.selectChoice(choiceId)}
          blurOptions={e => this.blurOptions(e)}
          createChoice={(text, fileIds, type) =>
            this.props.createChoice(bankId, item.id, text, fileIds, type, this.state.language)}
          deleteChoice={choice => this.deleteChoice(choice)}
          language={this.state.language}
          save={() => this.saveStateItem()}
          duplicateAnswers={this.getDuplicateAnswers()}
        />
      );
    }
    return null;
  }

  editContent() {
    const { item } = this.props;
    const { name, type, id, question, bankId } = item;
    const { multipleAnswer, multipleReflection, reflection } = types;

    return (
      <div>
        <Settings
          id={id}
          updateItem={newProps => this.updateItem(newProps)}
          defaultName={name}
          language={this.state.language}
          shuffle={question.shuffle}
          multipleAnswer={item.type === multipleAnswer || item.type === multipleReflection}
          reflection={_.includes([reflection, multipleReflection], item.type)}
          makeReflection={reflect => this.makeReflection(reflect)}
          makeMultipleAnswer={multi => this.makeMultipleAnswer(multi)}
          type={type}
        />
        <div className={`au-c-question__content ${this.props.reorderActive ? 'is-reordering' : ''}`}>
          <QuestionText
            itemType={type}
            fileIds={question.fileIds}
            itemId={id}
            editorKey={getLanguage(this.state.language)}
            text={languageText(question.texts, this.state.language)}
            updateItem={newProps => this.updateItem(newProps, true)}
            bankId={bankId}
            language={this.state.language}
          />
          {this.content()}
        </div>
      </div>
    );
  }

  previewContent() {
    return (
      <Preview
        item={this.props.item}
      />
    );
  }

  render() {
    const { name, type, id, isRemoving } = this.props.item;
    const className = this.getClassName();
    return (
      <div
        key={id}
        className={`au-o-item au-c-question ${className}`}
        onClick={() => this.props.activateItem(id)}
        onFocus={() => this.props.activateItem(id)}
      >
        <QuestionHeader
          isRemoving={isRemoving}
          name={name}
          type={type}
          deleteAssessmentItem={this.props.deleteAssessmentItem}
          id={id}
          index={this.props.itemIndex}
          topItem={this.props.topItem}
          bottomItem={this.props.bottomItem}
          toggleReorder={this.props.toggleReorder}
          reorderActive={this.props.isActive && this.props.reorderActive}
          moveUp={() => this.moveQuestionUp()}
          moveDown={() => this.moveQuestionDown()}
          togglePreview={() => this.setState({ preview: !this.state.preview })}
          itemIndex={this.props.itemIndex}
          preview={this.state.preview}
        />
        {this.state.preview && this.props.isActive ? this.previewContent() : this.editContent()}
      </div>
    );
  }
}

export default connect(select, ItemActions)(localize(Question));
