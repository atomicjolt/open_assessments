import React            from 'react';
import _                from 'lodash';
import MultipleChoice   from './multiple_choice';
import QuestionHeader   from './question_common/header/_header';
import Settings         from './question_common/settings';
import QuestionText     from './question_common/text';
import Feedback         from './question_common/feedback';
import genusTypes       from '../../../../constants/genus_types.js';
import AudioUpload      from './audio_upload';
import FileUpload       from './file_upload';

export default class Question extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      genusTypeId: React.PropTypes.string,
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

  content() {
    switch (this.props.item.genusTypeId) {
      case genusTypes.item.multipleChoice:
        return (
          <MultipleChoice
            {...this.props}
            updateItem={newProps => this.updateItem(newProps)}
            updateChoice={this.props.updateChoice}
          />
        );
      case genusTypes.item.audioUpload:
        return (
          <AudioUpload
            updateItem={newProps => this.updateItem(newProps)}
            item={this.props.item}
          />
        );
      case genusTypes.item.fileUpload:
        return (
          <FileUpload
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
    const { displayName, genusTypeId, id, description } = item;
    const className = this.getClassName();
    return (
      <div
        className={`o-item c-question ${className}`}
        tabIndex="0"
        onClick={() => this.props.activateItem(item.id)}
        onFocus={() => this.props.activateItem(item.id)}
      >
        <QuestionHeader
          name={displayName.text}
          type={genusTypeId}
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
          defaultName={displayName.text}
          language={displayName.languageTypeId}
          maintainOrder={false}
          multipleAnswer={false}
          reflection={false}
        />
        <div className={`c-question__content ${this.props.reorderActive ? 'is-reordering' : ''}`}>
          <QuestionText
            id={id}
            text={description.text}
            updateItem={newProps => this.updateItem(newProps)}
          />
          {this.content()}
        </div>
      </div>
    );
  }
}
