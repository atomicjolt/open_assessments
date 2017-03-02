import _           from 'lodash';
import $           from 'jquery';
import React       from 'react';
import { connect } from 'react-redux';

import TinyWrapper from './tiny_wrapper';
import guid        from '../../../utils/guid';

import * as AssetActions from '../../../actions/qbank/assets';

function select(state, props) {
  return {
    uploadedAssets: state.uploadedAssets,
    existingFileIds: _.get(
      state,
      `items['${props.bankId}']['${props.itemId}'].question.fileIds`,
      {}
    )
  };
}

export class OeaEditor extends React.Component {
  static propTypes = {
    onBlur: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
    itemId: React.PropTypes.string.isRequired,
    uploadImage: React.PropTypes.func.isRequired,
    uploadedAssets: React.PropTypes.shape({}).isRequired,
    existingFileIds: React.PropTypes.shape({})
  };

  constructor() {
    super();
    this.state = {
      focused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadedAssets !== this.props.uploadedAssets) {
      const asset = nextProps.uploadedAssets[this.props.itemId][this.state.imageGuid];
      const imageUrl = asset.assetContents[0].url;
      this.state.imageCallback(imageUrl);
      this.setState({ imageCallback: null, imageGuid: null });
    }
  }

  onBlur(editorText) {
    let text = editorText;
    const uploadedAssets = this.props.uploadedAssets;
    const fileIds = {};

    _.each(uploadedAssets[this.props.itemId], (asset, uploadedGuid) => {
      const assetContentId = asset.assetContents[0].id;

      // If we already have the image uploaded, don't make a new fileId entry
      // for it.
      const imageGuid = _.findKey(this.props.existingFileIds, fileData => (
        fileData.assetContentId === assetContentId
      )) || uploadedGuid;

      fileIds[imageGuid] = {
        assetId: asset.id,
        assetContentId,
        assetContentTypeId: asset.assetContents[0].genusTypeId
      };
      text = text.replace(asset.assetContents[0].url, `AssetContent:${imageGuid}`);
    });

    const doc = $(`<div>${text}</div>`);
    $('img', doc).each((i, el) => {
      const img = $(el);
      const match = /.*\/(.*)\/stream$/.exec(img.attr('src'));
      if (match) {
        const assetContentId = match[1];
        const imageGuid = _.findKey(this.props.existingFileIds, fileData => (
          fileData.assetContentId === assetContentId
        ));
        img.attr('src', `AssetContent:${imageGuid}`);
      }
    });

    text = doc.html();

    this.setState({ focused: false });
    this.props.onBlur(text, fileIds);
  }

  uploadImage(file, imageCallback) {
    const imageGuid = guid();
    this.props.uploadImage(
      file,
      imageGuid,
      this.props.itemId,
      this.props.bankId
    );
    this.setState({
      imageGuid,
      imageCallback,
    });
  }

  render() {
    const active = this.state.focused ? 'is-focused' : '';

    return (
      <div className="author--c-input__contain">
        <div className={`author--c-text-input author--c-text-input--medium author--c-wysiwyg ${active}`}>
          <TinyWrapper
            {...this.props}
            uploadImage={(file, imageCallback) => this.uploadImage(file, imageCallback)}
            onBlur={editorText => this.onBlur(editorText)}
            onFocus={() => this.setState({ focused: true })}
          />
        </div>
        <div className={`author--c-input__bottom ${active}`} />
      </div>
    );
  }
}

export default connect(select, AssetActions)(OeaEditor);
