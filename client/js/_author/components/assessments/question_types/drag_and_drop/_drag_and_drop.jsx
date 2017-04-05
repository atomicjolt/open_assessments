import React              from 'react';
import { connect }        from 'react-redux';
import * as AssetActions  from '../../../../../actions/qbank/assets';
import TargetArea         from './target_area';
import DragArea           from './drag_area';
import Feedback           from '../question_common/single_feedback';
import localize           from '../../../../locales/localize';
// TODO: not sure that I like guids on the front end...
import guid               from '../../../../../utils/guid';

function select(state) {
  return {
    loadingMedia: state.media.loading,
    images: state.media.image,
  };
}

export class DragAndDrop extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string,
      question: React.PropTypes.shape({}),
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  uploadMedia(file, where, metadata, newMedia) {
    this.props.addMediaToQuestion(
      file,
      this.props.item.bankId,
      this.props.item.id,
      // 'question.choices.new',
      `question.${where}`,
      metadata,
      newMedia
    );
  }

  render() {
    const { question, id } = this.props.item;

    // TODO: localization
    const strings = this.props.localizeStrings();
    return (
      <div>
        <TargetArea
          id={id}
          question={question}
          loadingMedia={this.props.loadingMedia}
          images={this.props.images}
          uploadMedia={(file, where, metadata, newMedia) => this.uploadMedia(file, where, metadata, newMedia)}
        />
        <div className="au-c-drop-zone__answers__label">Draggable answers</div>
        <DragArea
          dropObjects={question.dropObjects}
          createChoice={this.props.createChoice}
          updateChoice={(choiceId, choice, fileIds) => this.props.updateChoice(id, choiceId, choice, fileIds, 'dropObjects')}
          loadingMedia={this.props.loadingMedia}
          images={this.props.images}
          uploadMedia={(file, where, metadata, newMedia) => this.uploadMedia(file, where, metadata, newMedia)}
        />
        <div className="au-c-question__feedback">
          <Feedback
            updateItem={this.props.updateItem}
            feedbackType="correctFeedback"
            feedback={question.correctFeedback}
            labelText="Correct Feedback"
            bankId={this.props.item.bankId}
          />
          <Feedback
            updateItem={this.props.updateItem}
            feedbackType="incorrectFeedback"
            feedback={question.incorrectFeedback}
            labelText="Incorrect Feedback"
            bankId={this.props.item.bankId}
          />
        </div>
      </div>
    );
  }
}

export default connect(select, AssetActions)(localize(DragAndDrop));
