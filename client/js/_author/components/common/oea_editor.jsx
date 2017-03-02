import _           from 'lodash';
import React       from 'react';
import { connect } from 'react-redux';

import TinyWrapper from './tiny_wrapper';
import guid        from '../../../utils/guid';

import * as AssetActions from '../../../actions/qbank/assets';

function select(state) {
  return {
    uploadedAssets: state.uploadedAssets,
  };
}

export class OeaEditor extends React.Component {
  static propTypes = {
    onBlur: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
    itemId: React.PropTypes.string.isRequired,
    uploadImage: React.PropTypes.func.isRequired,
    uploadedAssets: React.PropTypes.shape({}).isRequired,
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
    const fileIds = {};
    _.each(this.props.uploadedAssets[this.props.itemId], (asset, imageGuid) => {
      fileIds[imageGuid] = {
        assetId: asset.id,
        assetContentId: asset.assetContents[0].id,
        assetContentTypeId: asset.assetContents[0].genusTypeId
      };
      text = text.replace(asset.assetContents[0].url, `AssetContent:${imageGuid}`);
    });
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
    // active is handled here instead of in TinyWrapper, because tinyMCE does
    // not handle rerendering very well. This may become unnecessary when
    // Brandon finishes the styles.

    const active = this.state.focused ? 'is-focused' : '';

    return (
      <div className="c-input__contain">
        <div className={`c-text-input c-text-input--medium c-wysiwyg ${active}`}>
          <TinyWrapper
            {...this.props}
            uploadImage={(file, imageCallback) => this.uploadImage(file, imageCallback)}
            onBlur={editorText => this.onBlur(editorText)}
            onFocus={() => this.setState({ focused: true })}
          />
        </div>
        <div className={`c-input__bottom ${active}`} />
      </div>
    );
  }
}

export default connect(select, AssetActions)(OeaEditor);

