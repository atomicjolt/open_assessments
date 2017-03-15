import React            from 'react';
import _                from 'lodash';
import MultipleChoice   from './multiple_choice/multiple_choice';
import QuestionHeader   from './question_common/header/_header';
import Settings         from './question_common/settings';
import QuestionText     from './question_common/text';
import AudioUpload      from './audio_upload';
import FileUpload       from './file_upload';
import ImageSequence    from './image_sequence/_image_sequence';
import ShortAnswer      from './short_answer';
import types            from '../../../../constants/question_types';
import languages        from '../../../../constants/language_types';
import Preview          from './preview_question';

export default class Question extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string,
      type: React.PropTypes.string,
      bankId: React.PropTypes.string,
      name: React.PropTypes.string,
    }).isRequired,
    isActive: React.PropTypes.bool,
    itemIndex: React.PropTypes.number,
    topItem: React.PropTypes.bool,
    bottomItem: React.PropTypes.bool,
    reorderActive: React.PropTypes.bool,
    updateItem: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    activateItem: React.PropTypes.func.isRequired,
    toggleReorder: React.PropTypes.func.isRequired,
    deleteAssessmentItem: React.PropTypes.func.isRequired,
    moveItem: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      reorderActive: false,
      language: languages.languageTypeId.english,
      preview: false,
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

  updateItem(newItemProperties) {

    const { item } = this.props;

    if (newItemProperties.language) {
      if (newItemProperties.language && this.state.language !== newItemProperties.language) {
        this.setState({ language: newItemProperties.language });
      }
    } else {
      this.props.updateItem({
        id: item.id,
        language: newItemProperties.language || this.state.language,
        ...newItemProperties
      });
    }
  }

  changeType(type) {
    // The choices: true is to make sure the deserializer updates the choice and answer data
    this.props.updateItem({
      id: this.props.item.id,
      type,
      question: {
        type,
        choices: true,
      }
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

  content() {

    switch (this.props.item.type) {
      case types.multipleChoice:
      case types.reflection:
      case types.multipleReflection:
      case types.multipleAnswer:
        return (
          <MultipleChoice
            {...this.props}
            updateItem={newProps => this.updateItem(newProps)}
            updateChoice={this.props.updateChoice}
            isActive={this.props.isActive}
          />
        );
      case types.audioUpload:
        return (
          <AudioUpload
            updateItem={newProps => this.updateItem(newProps)}
            item={this.props.item}
          />
        );
      case types.fileUpload:
        return (
          <FileUpload
            updateItem={newProps => this.updateItem(newProps)}
            item={this.props.item}
          />
        );

      case types.shortAnswer:
        return (
          <ShortAnswer
            updateItem={newProps => this.updateItem(newProps)}
            item={this.props.item}
          />
        );

      case types.imageSequence:
        return (
          <ImageSequence
            updateItem={newProps => this.updateItem(newProps)}
            item={this.props.item}
          />
        );

      default:
        return null;
    }
  }

  editContent() {
    const { item } = this.props;
    const { name, type, id, question, bankId } = item;
    const { multipleAnswer, multipleReflection, reflection } = types;
    const defaultLanguage = this.state.language;
    const chosenLanguage = _.find(item.question.texts, (textObj) => {
      return textObj.languageTypeId === defaultLanguage;
    });
    const questionText = _.get(chosenLanguage, 'text', '');
    const languageTypeId = _.get(chosenLanguage, 'languageTypeId');

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
            fileIds={question.fileIds}
            itemId={id}
            editorKey={languageTypeId}
            text={questionText}
            updateItem={newProps => this.updateItem(newProps)}
            bankId={bankId}
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
    const { name, type, id } = this.props.item;
    const className = this.getClassName();

    return (
      <div
        className={`au-o-item au-c-question ${className}`}
        tabIndex="0"
        onClick={() => this.props.activateItem(id)}
        onFocus={() => this.props.activateItem(id)}
      >
        <QuestionHeader
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
