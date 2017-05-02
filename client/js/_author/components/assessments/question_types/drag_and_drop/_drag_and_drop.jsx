import React              from 'react';
import { connect }        from 'react-redux';
import * as AssetActions  from '../../../../../actions/qbank/assets';
import TargetArea         from './target_area';
import DragArea           from './drag_area';
import Feedback           from '../question_common/single_feedback';
import localize           from '../../../../locales/localize';

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
    images: React.PropTypes.shape({}).isRequired,
    updateItem: React.PropTypes.func.isRequired,
    addMediaToQuestion: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    loadingMedia: React.PropTypes.bool,
    isActive: React.PropTypes.bool,
    language: React.PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  uploadMedia(file, where, metadata, newMedia) {
    this.props.addMediaToQuestion(
      file,
      this.props.item.bankId,
      this.props.item.id,
      `question.${where}`,
      metadata,
      newMedia,
      this.props.language
    );
  }

  render() {
    const { question, id, bankId } = this.props.item;

    const strings = this.props.localizeStrings('dragAndDrop');
    return (
      <div style={{ display: this.props.isActive ? 'block' : 'none' }}>
        <TargetArea
          id={id}
          question={question}
          loadingMedia={this.props.loadingMedia}
          images={this.props.images}
          uploadMedia={(file, where, metadata, newMedia) =>
            this.uploadMedia(file, where, metadata, newMedia)}
          visibleZones={question.visibleZones}
          setVisible={visibleZones => this.props.updateItem({ question: { visibleZones } }, true)}
          editZone={(zoneId, attributes) =>
            this.props.updateChoice(id, zoneId, attributes, null, 'zones')}
          language={this.props.language}

        />
        <div className="au-c-drop-zone__answers__label">{strings.draggableAnswers}</div>
        <DragArea
          dropObjects={question.dropObjects}
          zones={question.zones}
          updateDropObject={(choiceId, choice, fileIds) =>
            this.props.updateChoice(id, choiceId, choice, fileIds, 'dropObjects')}
          loadingMedia={this.props.loadingMedia}
          images={this.props.images}
          uploadMedia={(file, where, metadata, newMedia) =>
            this.uploadMedia(file, where, metadata, newMedia)}
          language={this.props.language}
        />
        <div className="au-c-question__feedback">
          <Feedback
            language={this.props.language}
            updateItem={this.props.updateItem}
            feedbackType="correctFeedback"
            feedback={question.correctFeedback}
            labelText="Correct Feedback"
            bankId={bankId}
          />
          <Feedback
            language={this.props.language}
            updateItem={this.props.updateItem}
            feedbackType="incorrectFeedback"
            feedback={question.incorrectFeedback}
            labelText="Incorrect Feedback"
            bankId={bankId}
          />
        </div>
      </div>
    );
  }
}

export default connect(select, AssetActions)(localize(DragAndDrop));
