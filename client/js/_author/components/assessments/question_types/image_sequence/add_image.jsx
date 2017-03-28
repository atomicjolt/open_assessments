import React             from 'react';
import { connect }       from 'react-redux';
import _                 from 'lodash';
import guid              from '../../../../../utils/guid';
import * as AssetActions from '../../../../../actions/qbank/assets';

function select(state) {
  return {
    uploadedAssets: state.uploadedAssets,
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
    uploadedAssets: React.PropTypes.shape({})
  };

  constructor() {
    super();
    this.state = {
      mediaGuid: null,
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

  uploadMedia(file) {
    const mediaGuid = guid();
    this.setState({
      mediaGuid,
    });
    this.props.uploadMedia(
      file,
      mediaGuid,
      this.props.uploadScopeId,
      this.props.item.bankId,
    );
  }

  render() {
    return (
      <div className="au-c-image-sequence-answer-add">
        <button className="au-c-image-sequence-answer-add__button">
          {this.getImageFile()}
          Add Image
        </button>
      </div>
    );
  }
}

export default connect(select, AssetActions)(AddImage);
