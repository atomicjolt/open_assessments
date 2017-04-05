import React            from 'react';
import Modal            from 'react-modal';
import _                from 'lodash';

import Loader           from '../dot_loader';
import languages        from '../../../../constants/language_types';
import SearchMedia      from './search_media';
import LanguageSelect   from '../language_dropdown';
import Metadata         from './meta_data';

const tagNameMap = {
  audio: 'Audio',
  img: 'Image',
  video: 'Video',
};

const mediaPrompt = {
  audio: 'Select an Audio file',
  img: 'Select an Image',
  video: 'Select a Video file',
};

export default class EditorUploadModal extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool,
    closeModal: React.PropTypes.func.isRequired,
    id: React.PropTypes.string,
    loading: React.PropTypes.bool,
    media: React.PropTypes.shape({}),
    mediaType: React.PropTypes.string,
    mediaName: React.PropTypes.string,
    insertMedia: React.PropTypes.func.isRequired,
    inProgress: React.PropTypes.bool,
    error: React.PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      uploadedMedia: null,
      selectedMedia: null,
      description: '',
      altText: '',
      license: '',
      copyright: '',
      activeItem: null,
      vttFile: null,
      transcript: null,
      mediaAutoPlay: false,
      language: languages.languageTypeId.english,
    };
  }

  getMetadata(mediaType) {
    if (mediaType === 'audio' || mediaType === 'video') {
      return {
        description: this.state.description,
        mediaAutoPlay: this.state.mediaAutoPlay,
        vttFile: this.state.vttFile,
        transcript: this.state.transcript,
        license: this.state.license,
        copyright: this.state.copyright,
      };
    }
    return {
      description: this.state.description,
      altText: this.state.altText,
      license: this.state.license,
      copyright: this.state.copyright,
    };
  }

  addMedia() {
    const metaData = this.getMetadata(this.props.mediaType);

    debugger
    if (this.state.uploadedMedia) {
      this.props.insertMedia(this.state.uploadedMedia, metaData, true);
    } else if (this.state.selectedMedia) {
      this.props.insertMedia(this.state.selectedMedia);
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

  metadataTypes(mediaType) {
    if (mediaType === 'audio' || mediaType === 'video') {
      return ['license', 'copyright', 'vttFile', 'transcript'];
    }
    return ['altText', 'license', 'copyright'];
  }

  render() {
    let name = this.props.mediaName;

    if (this.props.inProgress) {
      name = <Loader />;
    }

    if (this.props.error) {
      name = <div className="au-c-error-text">Error: {this.props.error}</div>;
    }

    return (
      <Modal
        overlayClassName="au-c-wysiwyg-modal-background"
        className="au-c-wysiwyg-modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        contentLabel={`Insert ${tagNameMap[this.props.mediaType]} Modal`}
      >
        <div className="au-c-wysiwyg-modal__header">
          <h3 className="au-c-wysiwyg-modal__title">
            Insert {tagNameMap[this.props.mediaType]}
          </h3>
          <LanguageSelect
            updateItem={language => this.setState(language)}
          />
          <button onClick={this.props.closeModal} className="au-c-wysiwyg-modal__close">
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="au-c-wysiwyg-modal__main">
          <div style={{ display: this.state.uploadedMedia ? 'none' : 'block' }}>
            <div className="au-c-drop-zone__answers__label">{mediaPrompt[this.props.mediaType]}</div>

            <SearchMedia
              media={this.props.media}
              selectMedia={item => this.selectMedia(item)}
              selectedMediaId={_.get(this.state.selectedMedia, 'id')}
              loading={this.props.loading}
            />

          </div>

          <div className="au-o-flex-center  au-u-mb-md au-u-mt-md">
            <span className="au-c-wysiwyg-media__label">Upload {tagNameMap[this.props.mediaType]}</span>
            <div className="au-c-wysiwyg-media__source-text" tabIndex="0">
              {name}
            </div>
            <div className="au-c-input--file  au-u-ml-sm">
              <input
                onChange={e => this.setState({ uploadedMedia: e.target.files[0] })}
                id="fileid"
                type="file"
              />
              <label htmlFor="fileid">
                <i className="material-icons">find_in_page</i>
              </label>
            </div>
          </div>
          {
            this.state.uploadedMedia ? <Metadata
              metadataTypes={this.metadataTypes(this.props.mediaType)}
              selectedImage={this.state.uploadedMedia || this.state.selectedMedia}
              id={this.props.id}
              updateMetadata={(key, val) => this.setState({ [key]: val })}
              mediaItem={this.state.selectedMedia}
              description={this.state.description}
              altText={this.state.altText}
              license={this.state.license}
              copyright={this.state.copyright}
            /> : null
          }

        </div>

        <div className="au-c-wysiwyg-modal__footer">
          <button
            onClick={this.props.closeModal}
            className="au-u-right  au-c-btn au-c-btn--sm au-c-btn--gray"
          >
            Cancel
          </button>
          <button
            onClick={() => this.addMedia()}
            className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-sm"
          >
            OK
          </button>
        </div>
      </Modal>
    );
  }
}
