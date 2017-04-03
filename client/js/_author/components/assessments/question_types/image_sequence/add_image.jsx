import React             from 'react';
import { connect }       from 'react-redux';
import _                 from 'lodash';
import guid              from '../../../../../utils/guid';
import * as AssetActions from '../../../../../actions/qbank/assets';
import UploadModal       from '../../../common/upload_modal/editor_upload_modal';
import localize     from '../../../../locales/localize';

function select(state) {
  return {
    loadingMedia: state.media.loading,
    images: state.media.image,
  };
}

export class AddImage extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string,
    }),
    uploadScopeId: React.PropTypes.string.isRequired,
    uploadMedia: React.PropTypes.func.isRequired,
    createChoice: React.PropTypes.func.isRequired,
    uploadedAssets: React.PropTypes.shape({}),
    localizeStrings:  React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      mediaGuid: null,
      modal: false,
    };
  }

  componentWillUpdate(nextProps) {
    const { uploadedAssets, uploadScopeId } = this.props;
    if (uploadedAssets
      && nextProps.uploadedAssets[uploadScopeId]
      && _.size(nextProps.uploadedAssets[uploadScopeId]) !== _.size(uploadedAssets[uploadScopeId])) {
      const fileIds = {};
      _.each(nextProps.uploadedAssets[uploadScopeId], (asset, mediaGuid) => {
        fileIds[mediaGuid] = {
          assetContentId: asset.assetContents[0].id,
          assetId: asset.id,
          assetContentTypeId: asset.assetContents[0].genusTypeId,
        };
      });
      const text = `<img src="AssetContent:${this.state.mediaGuid}" />`;
      this.props.createChoice(text, fileIds);
    }
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

  uploadMedia(file, metadata, newMedia) {
    this.setState({ modal: false });
    const mediaGuid = guid();
    this.setState({
      mediaGuid,
    });
    this.props.addMediaToQuestion(
      file,
      mediaGuid,
      this.props.uploadScopeId,
      this.props.item.bankId,
      this.props.item.id,
      'question.choices.new',
      metadata,
      newMedia
    );
  }

  render() {
    const strings = this.props.localizeStrings();
    return (
      <div className="au-c-image-sequence-answer-add">
        <button
          className="au-c-image-sequence-answer-add__button"
          onClick={() => this.setState({ modal: true })}
        >
          <UploadModal
            isOpen={this.state.modal}
            id={this.props.item.id}
            closeModal={() => this.setState({ modal: false })}
            mediaType="img"
            mediaName=""
            loadingMedia={this.props.loadingMedia}
            media={this.props.images}
            loading={this.props.loadingMedia}
            insertMedia={(media, metaData, newMedia) => this.uploadMedia(media, metaData, newMedia)}
            inProgress={false}
            error={null}
          />
          {strings.addImage}
        </button>
      </div>
    );
  }
}

export default connect(select, AssetActions)(localize(AddImage));
