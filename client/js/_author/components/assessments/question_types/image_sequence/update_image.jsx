import React             from 'react';
import { connect }       from 'react-redux';
import * as AssetActions from '../../../../../actions/qbank/assets';
import UploadModal       from '../../../common/upload_modal/editor_upload_modal';
import localize          from '../../../../locales/localize';

function select(state) {
  return {
    loadingMedia: state.media.loading,
    images: state.media.image,
  };
}

export class UpdateImage extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string,
    }),
    loadingMedia: React.PropTypes.bool,
    addMediaToQuestion: React.PropTypes.func,
    images: React.PropTypes.shape({}),
    localizeStrings:  React.PropTypes.func.isRequired,
    language: React.PropTypes.string,
    optionId: React.PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      mediaGuid: null,
      modal: false,
    };
  }

  getImageFile() {
    return (
      <div>
        <input
          onChange={e => this.uploadMedia(e.target.files[0])}
          id={`newImageId-${this.props.item.id}`}
          type="file"
        />
        <label htmlFor={`newImageId-${this.props.item.id}`}>
          <i className="material-icons">find_in_page</i>
        </label>
      </div>
    );
  }

  uploadMedia(file, metadata, newMedia, language) {
    this.setState({ modal: false });

    this.props.addMediaToQuestion(
      file,
      this.props.item.bankId,
      this.props.item.id,
      `question.choices.${this.props.optionId}`,
      metadata,
      newMedia,
      language
    );
  }

  render() {
    const strings = this.props.localizeStrings('addImage');
    return (
      <div className="au-c-image-sequence-answer-add">
        <button
          onClick={() => this.setState({ modal: true })}
        >
          <UploadModal
            isOpen={this.state.modal}
            id={this.props.item.id}
            closeModal={() => this.setState({ modal: false })}
            mediaType="img"
            mediaName=""
            media={this.props.images}
            loading={this.props.loadingMedia}
            insertMedia={
              (media, metaData, newMedia, language) =>
                this.uploadMedia(media, metaData, newMedia, language)}
            inProgress={false}
            error={null}
            language={this.props.language}
          />
          {strings.addImage}
        </button>
      </div>
    );
  }
}

export default connect(select, AssetActions)(localize(UpdateImage));
