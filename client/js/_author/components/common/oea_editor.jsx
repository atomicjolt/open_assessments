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
    mediaTypes: state.media,
    img: state.media.image,
    video: state.media.video,
    audio: state.media.audio,
    loadingMedia: state.media.loading,
    uploadedAssets: state.uploadedAssets,
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
    language: React.PropTypes.shape({}),
    textSize: React.PropTypes.string,
    error: React.PropTypes.string,
    loadingMedia: React.PropTypes.bool,
    editorKey: React.PropTypes.string
  };

  static VIDEO_CLASSES = 'video-js vjs-skin-colors-clix vjs-big-play-centered';


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
      const editorContent = this.getEditorContent(media, this.props.language);

      this.state.editor.insertContent(editorContent);
      this.closeModal();
    }

    if (nextProps.text !== this.state.newText) {
      this.setState({ newText: nextProps.text });
    }
  }

  onBlur(editorText, isChanged) {
    this.setState({ focused: false, newText: editorText });
    if (!isChanged) return;

    let text = editorText;
    const fileIds = {};

    // we don't want jquery to auto play or make any requests
    text = text.replace(/autoplay/g, 'autoplay-placeholder');
    text = text.replace(/src="/g, 'src-placeholder="');

    const doc = $(`<div>${text}</div>`);
    $('img, source, track', doc).each((i, el) => {
      const media = $(el);
      const match = /.*\/(.*)\/stream$/.exec(media.attr('src-placeholder'));
      if (match) {
        const assetContentId = match[1];
        const mediaGuid = this.findMediaGuid(assetContentId);
        if (mediaGuid) {
          media.attr('src-placeholder', `AssetContent:${mediaGuid}`);
        }

        let altText = _.head(
          _.filter(
            this.findMetaGuids(mediaGuid),
            assetContent => assetContent.assetContentTypeId === GenusTypes.assets.altText.altText
          )
        );

        if (!altText) {
          const asset = this.props.uploadedAssets[mediaGuid];
          altText = _.find(
            _.get(asset, 'original.assetContents'),
            content => content.genusTypeId === GenusTypes.assets.altText.altText
          );
        }

        if (altText) {
          const existingGuid = this.findMediaGuid(altText.id || altText.assetContentId);
          const altTextGuid = existingGuid || guid();
          if (_.isUndefined(existingGuid)) {
            fileIds[altTextGuid] = {
              assetId: altText.assetId,
              assetContentId: altText.id,
              assetContentTypeId: altText.genusTypeId,
            };
          }

          media.attr('alt', `AssetContent:${altTextGuid}`);
        }
      }
    });

    // Insert transcript tags before sending question text to qbank
    $('source', doc).each((i, el) => {
      const media = $(el);
      const assetContentGuid = media.attr('src-placeholder');
      if (assetContentGuid) {
        const match = assetContentGuid.match('AssetContent:(.+)');
        if (match) {
          const assetContentId = match[1];
          const transcriptGenus = GenusTypes.assets.transcript.transcript;
          const transcriptGuids =
            this.findMetaGuids(assetContentId)
            .filter(file =>
              file.assetContentTypeId === transcriptGenus ||
              file.genusTypeId === transcriptGenus
            );
            // Transcript tags need to be inserted after <audio> and <video> elements
            //  if we have any transcript files that match the video/audio asset
          if (!_.isEmpty(transcriptGuids)) {
            media.parent().after(`<transcript src="AssetContent:${transcriptGuids[0].guid}" />`);
          }
        }
      }
    });


    _.each(this.state.fileGuids, (file, mediaGuid) => {
      // we either uploaded it, or selected it in the modal. Check both places.
      const media = this.props.uploadedAssets[mediaGuid] || this.state.fileGuids[mediaGuid];
      if (media && !media.error) {
        const type = media.type && media.extension
          ? GenusTypes.assets[media.type][media.extension]
          : media.genusTypeId;

        fileIds[mediaGuid] = {
          assetId: media.id,
          assetContentId: media.assetContentId,
          assetContentTypeId: type,
        };
      }
    });

    // This is ugly, but qbank requires the html we send to be valid xml...
    const xmlSerializer = new window.XMLSerializer();
    text = xmlSerializer.serializeToString(doc[0]);
    text = text.replace(/^<div xmlns="http:\/\/www.w3.org\/1999\/xhtml">/, '');
    text = text.replace(/<\/div>$/, '');

    text = text.replace(/src-placeholder/g, 'src');
    text = text.replace(/autoplay-placeholder/g, 'autoplay');

    this.props.onBlur(text, fileIds);
    this.setState({ fileGuids: {} });
  }

  getEditorContent(media, language) {
    if (!_.isUndefined(media.error)) { return ''; }

    let editorContent = `<video><source src="${media.url}" /></video>`;
    const altText = _.find(media.altTexts, text => text.languageTypeId === language);
    const alt = _.get(altText, 'text', '');

    const autoPlay = media.autoPlay ? 'autoplay' : '';
    switch (this.state.mediaType) {
      case 'img':
        editorContent = `<img src="${media.url}" alt="${alt}">`;
        break;

      case 'audio':
        {
          const extension = media.extension === 'm4a' ? 'mp4' : media.extension; // Chrome doesn't play nice with m4a
          editorContent = `<audio class="span_12_of_12" ${autoPlay} name="media" controls>` +
          `<source src="${media.url}" type="${this.state.mediaType}/${extension}">` +
          '</audio>';
        }
        break;
      case 'video':
        {
          const track = _.isEmpty(media.vtt) ? '' : `<track src="${_.get(media, 'vtt.url')}" srclang="en">`;
          editorContent = `<video class="${OeaEditor.VIDEO_CLASSES}" ${autoPlay} name="media" controls>` +
            `<source src="${media.url}" type="${this.state.mediaType}/${media.extension}">` +
            `${track}</video>`;
        }
        break;

      default:
        break;
    }

    return editorContent;
  }

  // Find all assets whose assetId match the asset with assetGuid
  findMetaGuids(assetGuid) {
    const { fileIds, uploadedAssets } = this.props;
    const { fileGuids } = this.state;
    const allAssets = {
      ...fileGuids,
      ...fileIds,
      ...uploadedAssets,
    };
    const asset = allAssets[assetGuid];
    const id = asset.id || asset.assetId;
    if (_.isEmpty(asset)) return [];

    return _.toPairs(allAssets)
      .map(file => ({
        guid: file[0], // We need to add the guid to the asset object
        ...file[1]
      })).filter(file => file.assetId === id);
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
      const assetGuids = {
        mediaGuid,
        vttGuids: [],
        transcriptGuids: [],
      };
      _.each(metaData, (meta) => {
        if (meta.vttFile) {
          const newGuid = guid();
          assetGuids.vttGuids.push(newGuid);
          fileGuids[newGuid] = {};
        }

        if (meta.transcript) {
          const newGuid = guid();
          assetGuids.transcriptGuids.push(newGuid);
          fileGuids[newGuid] = {};
        }
      });

      fileGuids[mediaGuid] = {};
      this.props.uploadMedia(
        file,
        assetGuids,
        this.props.bankId,
        metaData,
      );
      this.setState({ mediaGuid });
    } else {
      const editorContent = this.getEditorContent(file, this.props.language);
      this.state.editor.insertContent(editorContent);
      fileGuids[mediaGuid] = file;
      fileGuids[guid()] = file.vtt;
      fileGuids[guid()] = file.transcript;
      this.closeModal();
    }

    this.setState({ fileGuids });
  }

  cleanText() {
    let { text } = this.props;
    if (!text) return text;

    text = text.replace(/autoplay/g, 'autoplay-placeholder');
    text = text.replace(/src="/g, 'src-placeholder="');
    const doc = $(`<div>${text}</div>`);
    $('.transcriptWrapper', doc).remove();
    let cleanedHtml = doc.html();
    cleanedHtml = cleanedHtml.replace(/src-placeholder/g, 'src');
    return cleanedHtml.replace(/autoplay-placeholder/g, 'autoplay');
  }

  render() {
    const isActive = this.state.focused || this.state.modalOpen;
    const activeClass = isActive ? 'is-focused' : 'no-border';
    const hidePlaceholder = (this.state.newText && this.state.newText.length) || isActive ? 'is-hidden' : '';

    const { textSize } = this.props;
    const uploadedAsset = _.get(this.props, `uploadedAssets['${this.state.mediaGuid}'].assetContents[0]`);
    return (
      <div className="au-c-input__contain">
        <div className={`au-c-text-input au-c-text-input--${textSize} au-c-wysiwyg ${activeClass}`}>
          <div className={`au-c-placeholder ${hidePlaceholder}`}>{this.props.placeholder}</div>
          <TinyWrapper
            bankId={this.props.bankId}
            editorKey={this.props.editorKey}
            text={this.cleanText()}
            onBlur={(editorText, isChanged) => this.onBlur(editorText, isChanged)}
            onChange={editorText => this.setState({ newText: editorText })}
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
          language={this.props.language}
        />
      </div>
    );
  }
}

export default connect(select, AssetActions)(OeaEditor);
