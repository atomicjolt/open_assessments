import _                        from 'lodash';
import $                        from 'jquery';
import React                    from 'react';
import { connect }              from 'react-redux';
import Modal                    from './upload_modal/editor_upload_modal';
import TinyWrapper              from './tiny_wrapper';
import guid                     from '../../../utils/guid';
import * as AssetActions        from '../../../actions/qbank/assets';
import { types as GenusTypes }  from '../../../constants/genus_types';

function select(state) {
  return {
    img: state.media.image,
    video: state.media.video,
    audio: state.media.audio,
    loadingMedia: state.media.loading,
    uploadedAssets: state.uploadedAssets
  };
}

// TODO: figure out how to localize this
export class OeaEditor extends React.Component {
  static propTypes = {
    onBlur: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    text: React.PropTypes.string,
    uploadMedia: React.PropTypes.func.isRequired,
    uploadedAssets: React.PropTypes.shape({}),
    fileIds: React.PropTypes.shape({}),
    textSize: React.PropTypes.string,
    error: React.PropTypes.string,
    loadingMedia: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      fileGuids: {},
      focused: false,
      editor: null,
      modalOpen: false,
      mediaType: null,
      mediaGuid: null,
      newText: this.props.text,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!_.get(this.props.uploadedAssets, this.state.mediaGuid) &&
      _.get(nextProps.uploadedAssets, this.state.mediaGuid)
    ) {
      const media = nextProps.uploadedAssets[this.state.mediaGuid];
      const editorContent = this.getEditorContent(media);

      this.state.editor.insertContent(editorContent);
      this.closeModal();
    }
  }

  onBlur(editorText, isChanged) {
    this.setState({ focused: false, newText: editorText });
    if (!isChanged) return;

    let text = editorText;
    const fileIds = {};

    // we don't want jquery to auto play anything
    text = text.replace('autoplay', 'autoplay-placeholder');

    const doc = $(`<div>${text}</div>`);
    $('img, source', doc).each((i, el) => {
      const media = $(el);
      const match = /.*\/(.*)\/stream$/.exec(media.attr('src'));
      if (match) {
        const assetContentId = match[1];
        const mediaGuid = this.findMediaGuid(assetContentId);
        if (mediaGuid) {
          text = text.replace(media.attr('src'), `AssetContent:${mediaGuid}`);
        }
      }
    });

    _.each(this.state.fileGuids, (file, mediaGuid) => {
      // we either uploaded it, or selected it in the modal. Check both places.
      const media = this.props.uploadedAssets[mediaGuid] || this.state.fileGuids[mediaGuid];
      if (media && !media.error) {
        fileIds[mediaGuid] = {
          assetId: media.id,
          assetContentId: media.assetContentId,
          assetContentTypeId: GenusTypes.assets[media.type][media.extension]
        };
      }
    });

    text = text.replace('autoplay-placeholder', 'autoplay');

    this.props.onBlur(text, fileIds);
    this.setState({ fileGuids: {} });
  }

  getEditorContent(media) {
    let editorContent = `<video><source src="${media.url}" /></video>`;
    const alt = _.isEmpty(media.altText) ? '' : media.altText.text;

    switch (this.state.mediaType) {
      case 'img':
        editorContent = `<img src="${media.url}" alt="${alt}">`;
        break;

      case 'audio':
      case 'video':
        editorContent = `<${this.state.mediaType} autoplay name="media" controls>` +
          `<source src="${media.url}" type="${this.state.mediaType}/${media.extension}"/>` +
          `</${this.state.mediaType}>`;
        break;

      default:
        break;
    }

    return editorContent;
  }

  findMediaGuid(assetContentId) {
    // try to find in existing fileIds, otherwise try to find in newly uploaded fileIds.
    return _.findKey(this.props.fileIds, file => (
      file.assetContentId === assetContentId
    )) || _.findKey(this.props.uploadedAssets, file => (
      file.assetContentId === assetContentId
    )) || _.findKey(this.state.fileGuids, file => (
      file.assetContentId === assetContentId
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
      metaData: null,
    });
  }

  insertMedia(file, metaData, newMedia) {
    if (!file) {
      this.closeModal();
      return;
    }

    const mediaGuid = guid();
    const fileGuids = _.cloneDeep(this.state.fileGuids);

    if (newMedia) {
      fileGuids[mediaGuid] = {};
      this.props.uploadMedia(
        file,
        mediaGuid,
        this.props.bankId,
        metaData,
      );
      this.setState({ mediaGuid });
    } else {
      const editorContent = this.getEditorContent(file);
      this.state.editor.insertContent(editorContent);
      fileGuids[mediaGuid] = file;
      this.closeModal();
    }

    this.setState({ fileGuids });
  }

  render() {
    const isActive = this.state.focused || this.state.modalOpen;
    const activeClass = isActive ? 'is-focused' : 'no-border';
    const hidePlaceholder = this.state.newText || isActive ? 'is-hidden' : '';

    const { textSize } = this.props;
    const uploadedAsset = _.get(this.props, `uploadedAssets['${this.state.mediaGuid}'].assetContents[0]`);
    return (
      <div className="au-c-input__contain">
        <div className={`au-c-text-input au-c-text-input--${textSize} au-c-wysiwyg ${activeClass}`}>
          <div className={`au-c-placeholder ${hidePlaceholder}`}>{this.props.placeholder}</div>
          <TinyWrapper
            {...this.props}
            onBlur={(editorText, isChanged) => this.onBlur(editorText, isChanged)}
            onFocus={() => this.setState({ focused: true })}
            openModal={(editor, type) => this.openModal(editor, type)}
          />
        </div>
        <div className={`au-c-input__bottom ${activeClass}`} />
        <Modal
          isOpen={this.state.modalOpen}
          insertMedia={(media, metaData, newMedia) => this.insertMedia(media, metaData, newMedia)}
          inProgress={this.state.mediaGuid && !_.get(uploadedAsset, 'displayName.text')}
          error={this.props.error}
          closeModal={() => this.closeModal()}
          mediaType={this.state.mediaType}
          media={this.props[this.state.mediaType]}
          loading={this.props.loadingMedia}
        />
      </div>
    );
  }
}

export default connect(select, AssetActions)(OeaEditor);
