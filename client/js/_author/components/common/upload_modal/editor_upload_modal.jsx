import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';

import Loader from '../dot_loader';
import { languages, getLanguage } from '../../../../constants/language_types';
import { types } from '../../../../constants/genus_types';
import SearchMedia from './search_media';
import LanguageSelect from '../language_dropdown';
import Metadata from './meta_data';
import localize from '../../../locales/localize';

const tagNameMap = {
  audio: 'Audio',
  img: 'Image',
  video: 'Video',
};

const languageToLocale = {
  '639-2%3AENG%40ISO': 'en',
  '639-2%3AHIN%40ISO': 'hi',
  '639-2%3ATEL%40ISO': 'te',
};

export class EditorUploadModal extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool,
    localizeStrings: React.PropTypes.func,
    closeModal: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    media: React.PropTypes.shape({}),
    mediaType: React.PropTypes.string,
    insertMedia: React.PropTypes.func.isRequired,
    inProgress: React.PropTypes.bool,
    error: React.PropTypes.string,
    uploadOnly: React.PropTypes.bool,
    language: React.PropTypes.string,
  };

  static initLanguageMediaData() {
    return _.reduce(languages.languageTypeId, (result, language) => {
      result[language] = {  // eslint-disable-line no-param-reassign
        locale: languageToLocale[language]
      };
      return result;
    }, {}
   );
  }

  constructor(props) {
    super();
    this.state = {
      languageMediaData: EditorUploadModal.initLanguageMediaData(),
      activeItem: null,
      mediaAutoPlay: false,
      uploadedMedia: null,
      selectedMedia: null,
      language: props.language || languages.languageTypeId.english, //default to english
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ language: nextProps.language });
  }

  componentDidUpdate() {
    if (!this.props.isOpen && this.state.uploadedMedia) {
      this.resetModal();
    }
  }

  setters(key, val) {
    const languageMediaData = this.state.languageMediaData;
    languageMediaData[this.state.language][key] = val;
    this.setState({ languageMediaData });
  }

  mediaPrompt() {
    const strings = this.props.localizeStrings('editorUploadModal');
    return {
      audio: strings.audioFile,
      img: strings.imgFile,
      video: strings.videoFile,
    };
  }

  addMedia() {
    const metaData = {
      ...this.state.languageMediaData,
      mediaType: this.props.mediaType,
    };

    if (this.state.uploadedMedia) {
      this.props.insertMedia(this.state.uploadedMedia, metaData, true, this.state.language);
    } else if (this.state.selectedMedia) {
      const { selectedMedia } = this.state;
      const altTexts = _.find(
        selectedMedia.original.assetContents,
        content => content.genusTypeId === types.assets.altText.altText
      );
      const altText = _.find(
        altTexts,
        text => this.state.language && text.languageTypeId === this.state.language
      );

      if (altText) {
        metaData[this.state.language].altText = altText.text;
      }
      this.props.insertMedia(selectedMedia, metaData, false, this.state.language);
    }
  }

  selectMedia(item) {
    const { description, altText, license, copyright } = item;
    this.setState({
      selectedMedia: item,
      description,
      altText,
      license,
      copyright,
    });
  }

  metadataFileTypes() {
    const { mediaType } = this.props;
    if (mediaType === 'video') {
      return ['vttFile', 'transcript'];
    } else if (mediaType === 'audio') {
      return ['transcript'];
    }
    return [];
  }

  metadataTypes() {
    const { mediaType } = this.props;
    if (mediaType === 'audio' || mediaType === 'video') {
      return ['citation', 'copyright', 'license'];
    }
    return ['altText', 'citation', 'copyright', 'license'];
  }

  resetModal() {
    this.setState({
      uploadedMedia: null,
      languageMediaData: EditorUploadModal.initLanguageMediaData(),
      language: languages.languageTypeId.english
    });
  }

  closeModal() {
    this.props.closeModal();
    this.resetModal();
  }

  render() {
    const strings = this.props.localizeStrings('editorUploadModal');
    let name = _.get(this, 'state.uploadedMedia.name');

    if (this.props.inProgress) {
      name = <Loader />;
    }

    if (this.props.error) {
      name = <div className="au-c-error-text">{strings.error}: {this.props.error}</div>;
    }

    return (
      <Modal
        overlayClassName="au-c-wysiwyg-modal-background"
        className="au-c-wysiwyg-modal"
        isOpen={this.props.isOpen}
        onRequestClose={() => this.closeModal()}
        contentLabel={`Insert ${tagNameMap[this.props.mediaType]} Modal`}
      >
        <div className="au-c-wysiwyg-modal__header">
          <h3 className="au-c-wysiwyg-modal__title">
            {strings.insert} {tagNameMap[this.props.mediaType]}
          </h3>
          <LanguageSelect
            updateItem={language => this.setState(language)}
            language={getLanguage(this.state.language)}
          />
          <button onClick={() => this.closeModal()} className="au-c-wysiwyg-modal__close">
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="au-c-wysiwyg-modal__main">
          <div style={{ display: this.state.uploadedMedia || this.props.uploadOnly ? 'none' : 'block' }}>
            <div className="au-c-drop-zone__answers__label">{EditorUploadModal[this.props.mediaType]}</div>

            <SearchMedia
              media={this.props.media}
              selectMedia={item => this.selectMedia(item)}
              selectedMediaId={_.get(this.state.selectedMedia, 'id')}
              loading={this.props.loading}
            />

          </div>

          <div className="au-u-mb-md au-u-mt-md">
            <label htmlFor="fileid" className="au-c-input--file au-o-flex-center">
              <span className="au-c-wysiwyg-media__label">Upload {tagNameMap[this.props.mediaType]}</span>
              <div className="au-c-wysiwyg-media__source-text" tabIndex="0">
                {name}
              </div>
              <input
                onChange={e => this.setState({ uploadedMedia: e.target.files[0] })}
                id="fileid"
                type="file"
              />
              <div className="au-c-wysiwyg-media__upload">
                <i className="material-icons">find_in_page</i>
              </div>
            </label>
          </div>
          {
            this.state.uploadedMedia ? <Metadata
              mediaType={this.props.mediaType}
              metadataTypes={this.metadataTypes()}
              metadataFileTypes={this.metadataFileTypes()}
              selectedLanguage={this.state.language}
              updateMetadata={(key, val) => this.setters(key, val)}
              mediaItem={this.state.selectedMedia}
              metaData={this.state.languageMediaData[this.state.language]}
            /> : null
          }

        </div>

        <div className="au-c-wysiwyg-modal__footer">
          <button
            onClick={() => this.closeModal()}
            className="au-u-right  au-c-btn au-c-btn--sm au-c-btn--gray"
          >
            {strings.cancel}
          </button>
          <button
            onClick={() => this.addMedia()}
            className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-sm"
          >
            {strings.ok}
          </button>
        </div>
      </Modal>
    );
  }
}

export default localize(EditorUploadModal);
