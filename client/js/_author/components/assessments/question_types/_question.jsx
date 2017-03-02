import React            from 'react';
import MultipleChoice   from './multiple_choice';
import QuestionHeader   from './question_common/header/_header';
import Settings         from './question_common/settings';
import QuestionText     from './question_common/text';
import genusTypes       from '../../../../constants/genus_types.js';
import AudioUpload      from './audio_upload';
import FileUpload       from './file_upload';
import ShortAnswer      from './short_answer';

export default class Question extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      type: React.PropTypes.string,
      bankId: React.PropTypes.string,
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
    };
  }

  getClassName() {
    if (this.props.isActive && this.props.reorderActive) {
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
    this.props.updateItem({ id: item.id, ...newItemProperties });
  }

  makeReflection(reflect) {
    const { item } = this.props;
    let type = 'multipleChoice';
    if (reflect) {
      type = item.multipleAnswer ? 'multipleReflection' : 'reflection';
    }
    // The choices: true is to make sure the deserializer updates the choice and answer data
    this.props.updateItem({
      id: item.id,
      type,
      question: {
        type,
        choices: true,
      }
    });
  }

  content() {
    switch (this.props.item.type) {
      case 'multipleChoice':
      case 'reflection':
        return (
          <MultipleChoice
            {...this.props}
            updateItem={newProps => this.updateItem(newProps)}
            updateChoice={this.props.updateChoice}
            isActive={this.props.isActive}
          />
        );
      case 'audioUpload':
        return (
          <AudioUpload
            updateItem={newProps => this.updateItem(newProps)}
            item={this.props.item}
          />
        );
      case 'fileUpload':
        return (
          <FileUpload
            updateItem={newProps => this.updateItem(newProps)}
            item={this.props.item}
          />
        );

      case 'shortAnswer':
        return (
          <ShortAnswer
            updateItem={newProps => this.updateItem(newProps)}
            item={this.props.item}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const { item } = this.props;
    const { name, type, id, question, language, bankId } = item;
    const className = this.getClassName();

    const questionText = question ? question.text : '';

    return (
      <div
        className={`author--o-item author--c-question ${className}`}
        tabIndex="0"
        onClick={() => this.props.activateItem(item.id)}
        onFocus={() => this.props.activateItem(item.id)}
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
        />
        <Settings
          id={id}
          updateItem={newProps => this.updateItem(newProps)}
          defaultName={name}
          language={language}
          maintainOrder={question && !question.shuffle}
          multipleAnswer={item.multipleAnswer}
          reflection={item.type === 'reflection'}
          makeReflection={reflect => this.makeReflection(reflect)}
          type={type}
        />
        <div className={`author--c-question__content ${this.props.reorderActive ? 'is-reordering' : ''}`}>
          <QuestionText
            itemId={id}
            text={questionText}
            updateItem={newProps => this.updateItem(newProps)}
            bankId={bankId}
          />
          {this.content()}
        </div>
      </div>
    );
  }
}
