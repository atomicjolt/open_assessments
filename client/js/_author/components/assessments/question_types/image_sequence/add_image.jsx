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
    updateChoice: React.PropTypes.func.isRequired,
    uploadedAssets: React.PropTypes.shape({})
  }

  constructor() {
    super();
    this.state = {
      mediaGuid: null,
    };
  }

  componentWillUpdate(nextProps) {
    if (this.props.uploadedAssets && !this.props.uploadedAssets[this.props.uploadScopeId] &&
      nextProps.uploadedAssets[this.props.uploadScopeId]
    ) {
      const fileIds = {};
      _.each(nextProps.uploadedAssets[this.props.uploadScopeId], (asset, mediaGuid) => {
        fileIds[mediaGuid] = {
          assetContentId: asset.assetContents[0].id,
          assetId: asset.id,
          assetContentTypeId: asset.assetContents[0].genusTypeId,
        };
      });
      const text = `<img src="AssetContent:${this.state.mediaGuid}" />`;
      this.props.updateChoice(this.props.item.id, 'new', { text }, fileIds);
    }
  }


  getImageFile() {
    return (
      <div>
        <input
          onChange={e => this.uploadMedia(e.target.files[0])}
          id="newImageId"
          type="file"
        />
        <label htmlFor="newImageId">
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
