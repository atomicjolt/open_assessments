import _                 from 'lodash';
import $                 from 'jquery';
import React             from 'react';
import { connect }       from 'react-redux';
import Modal             from './editor_upload_modal';
import TinyWrapper       from './tiny_wrapper';
import guid              from '../../../utils/guid';
import * as AssetActions from '../../../actions/qbank/assets';

function select(state, props) {
  return {
    uploadedAssets: state.uploadedAssets[props.uploadScopeId]
  };
}

export class OeaEditor extends React.Component {
  static propTypes = {
    onBlur: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
    uploadScopeId: React.PropTypes.string.isRequired,
    uploadMedia: React.PropTypes.func.isRequired,
    uploadedAssets: React.PropTypes.shape({}),
    fileIds: React.PropTypes.shape({}),
    textSize: React.PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      focused: false,
      editor: null,
      modalOpen: false,
      mediaType: null,
      mediaGuid: null,
    };
  }

  onBlur(editorText, isChanged) {
    this.setState({ focused: false });
    if (!isChanged) return;

    let text = editorText;
    const fileIds = {};

    const doc = $(`<div>${text}</div>`);
    $('img, source', doc).each((i, el) => {
      const media = $(el);
      const match = /.*\/(.*)\/stream$/.exec(media.attr('src'));
      if (match) {
        const assetContentId = match[1];
        const mediaGuid = this.findMediaGuid(assetContentId);
        text = text.replace(media.attr('src'), `AssetContent:${mediaGuid}`);
      }
    });

    _.each(this.props.uploadedAssets, (asset, mediaGuid) => {
      fileIds[mediaGuid] = {
        assetId: asset.id,
        assetContentId: asset.assetContents[0].id,
        assetContentTypeId: asset.assetContents[0].genusTypeId
      };
    });

    this.props.onBlur(text, fileIds);
  }

  findMediaGuid(assetContentId) {
    // try to find in existing fileIds, otherwise try to find in newly uploaded fileIds.
    return _.findKey(this.props.fileIds, fileData => (
      fileData.assetContentId === assetContentId
    )) || _.findKey(this.props.uploadedAssets, fileData => (
      fileData.assetContents[0].id === assetContentId
    ));
  }

  openModal(editor, type) {
    this.setState({
      editor,
      modalOpen: true,
      mediaType: type
    });
  }

  closeModal() {
    this.setState({
      editor: null,
      modalOpen: false,
      mediaType: null,
      mediaGuid: null,
    });
  }

  uploadMedia(file) {
    const mediaGuid = guid();
    this.props.uploadMedia(
      file,
      mediaGuid,
      this.props.uploadScopeId,
      this.props.bankId
    );
    this.setState({
      mediaGuid
    });
  }

  insertMedia(mediaUrl) {
    if (!mediaUrl) return;

    let editorContent = `<video><source src="${mediaUrl}" /></video>`;

    switch (this.state.mediaType) {
      case 'img':
        editorContent = `<img src="${mediaUrl}" />`;
        break;

      case 'audio':
      case 'video':
        editorContent = `<${this.state.mediaType} controls><source src="${mediaUrl}" /></${this.state.mediaType}>`;
        break;

      default:
        break;
    }

    this.state.editor.insertContent(editorContent);
    this.closeModal();
  }

  render() {
    const active = this.state.focused || this.state.modalOpen ? 'is-focused' : 'no-border';
    const { textSize } = this.props;
    const uploadedAsset = _.get(this.props, `uploadedAssets['${this.state.mediaGuid}'].assetContents[0]`);

    return (
      <div className="au-c-input__contain">
        <div className={`au-c-text-input au-c-text-input--${textSize} au-c-wysiwyg ${active}`}>
          <TinyWrapper
            {...this.props}
            uploadMedia={(file, mediaCallback) => this.uploadMedia(file, mediaCallback)}
            onBlur={(editorText, isChanged) => this.onBlur(editorText, isChanged)}
            onFocus={() => this.setState({ focused: true })}
            openModal={(editor, type) => this.openModal(editor, type)}
          />
        </div>
        <div className={`au-c-input__bottom ${active}`} />
        <Modal
          isOpen={this.state.modalOpen}
          closeModal={() => this.closeModal()}
          insertMedia={() => this.insertMedia(_.get(uploadedAsset, 'url'))}
          mediaName={_.get(uploadedAsset, 'displayName.text')}
          mediaType={this.state.mediaType}
          uploadMedia={file => this.uploadMedia(file)}
        />
      </div>
    );
  }
}

export default connect(select, AssetActions)(OeaEditor);
