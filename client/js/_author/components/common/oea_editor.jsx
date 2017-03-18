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
    uploadedAssets: state.uploadedAssets[props.uploadScopeId],
    error: _.get(state, `uploadedAssets["${props.uploadScopeId}"].error.message`)
  };
}

export class OeaEditor extends React.Component {
  static propTypes = {
    onBlur: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
    uploadScopeId: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    text: React.PropTypes.string,
    uploadMedia: React.PropTypes.func.isRequired,
    uploadedAssets: React.PropTypes.shape({}),
    fileIds: React.PropTypes.shape({}),
    textSize: React.PropTypes.string,
    error: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      editor: null,
      modalOpen: false,
      mediaType: null,
      mediaGuid: null,
      newText: this.props.text,
    };
  }

  onBlur(editorText, isChanged) {
    this.setState({ focused: false, newText: editorText });
    if (!isChanged) return;

    let text = editorText;
    const fileIds = {};
    text = text.replace('autoplay', 'autoplay-placeholder');
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
      if (!asset.error) {
        fileIds[mediaGuid] = {
          assetId: asset.id,
          assetContentId: asset.assetContents[0].id,
          assetContentTypeId: asset.assetContents[0].genusTypeId
        };
      }
    });

    text = text.replace('autoplay-placeholder', 'autoplay');

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

  insertMedia(mediaUrl, mediaName) {
    if (!mediaUrl) {
      this.closeModal();
      return;
    }

    let editorContent = `<video><source src="${mediaUrl}" /></video>`;

    switch (this.state.mediaType) {
      case 'img':
        editorContent = `<img src="${mediaUrl}" />`;
        break;

      case 'audio':
      case 'video':
        editorContent = `<${this.state.mediaType} autoplay name="media" controls>` +
          `<source src="${mediaUrl}" type="${this.state.mediaType}/${_.last(mediaName.split('.'))}"/>` +
          `</${this.state.mediaType}>`;
        break;

      default:
        break;
    }

    this.state.editor.insertContent(editorContent);
    this.closeModal();
  }

  render() {
    const isActive = this.state.focused || this.state.modalOpen;
    const activeClass = isActive ? 'is-focused' : 'no-border';
    const hidePlaceholder = this.state.newText || isActive ? 'is-hidden' : '';

    const { textSize } = this.props;
    const uploadedAsset = _.get(this.props, `uploadedAssets['${this.state.mediaGuid}'].assetContents[0]`);
    const mediaName = _.get(uploadedAsset, 'displayName.text');
    return (
      <div className="au-c-input__contain">
        <div className={`au-c-text-input au-c-text-input--${textSize} au-c-wysiwyg ${activeClass}`}>
          <div className={`au-c-placeholder ${hidePlaceholder}`}>{this.props.placeholder}</div>
          <TinyWrapper
            {...this.props}
            uploadMedia={(file, mediaCallback) => this.uploadMedia(file, mediaCallback)}
            onBlur={(editorText, isChanged) => this.onBlur(editorText, isChanged)}
            onFocus={() => this.setState({ focused: true })}
            openModal={(editor, type) => this.openModal(editor, type)}
          />
        </div>
        <div className={`au-c-input__bottom ${activeClass}`} />
        <Modal
          isOpen={this.state.modalOpen}
          closeModal={() => this.closeModal()}
          insertMedia={() => this.insertMedia(_.get(uploadedAsset, 'url'), mediaName)}
          mediaName={mediaName}
          mediaType={this.state.mediaType}
          uploadMedia={file => this.uploadMedia(file)}
          inProgress={this.state.mediaGuid && !_.get(uploadedAsset, 'displayName.text')}
          error={this.props.error}
        />
      </div>
    );
  }
}

export default connect(select, AssetActions)(OeaEditor);
