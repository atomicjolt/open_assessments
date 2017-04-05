import React            from 'react';
import Modal            from 'react-modal';
import _                from 'lodash';
import Loader           from '../dot_loader';
import SearchMedia      from './search_media';
import LanguageSelect   from '../language_dropdown';
import Metadata         from './meta_data';

const tagNameMap = {
  audio: 'Audio',
  img: 'Image',
  video: 'Video',
};

export default class EditorUploadModal extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool,
    closeModal: React.PropTypes.func.isRequired,
    id: React.PropTypes.string,
    loading: React.PropTypes.string,
    media: React.PropTypes.string,
    mediaType: React.PropTypes.string,
    mediaName: React.PropTypes.string,
    insertMedia: React.PropTypes.func.isRequired,
    inProgress: React.PropTypes.bool,
    error: React.PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      uploadedImage: null,
      selectedMedia: null,
      description: '',
      altText: '',
      license: '',
      copyright: '',
      activeItem: null,
    };
  }

  addMedia() {
    const metaData = {
      description: this.state.description,
      altText: this.state.altText,
      license: this.state.license,
      copyright: this.state.copyright,
    };
    if (this.state.uploadedImage) {
      this.props.insertMedia(this.state.uploadedImage, metaData, true);
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

  render() {
    let name = _.get(this, 'state.uploadedImage.name');

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
          <div style={{ display: this.state.uploadedImage ? 'none' : 'block' }}>
            <div className="au-c-drop-zone__answers__label">Select an Image</div>

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
                onChange={e => this.setState({ uploadedImage: e.target.files[0] })}
                id="fileid"
                type="file"
              />
              <label htmlFor="fileid">
                <i className="material-icons">find_in_page</i>
              </label>
            </div>
          </div>
          {
            this.state.uploadedImage ? <Metadata
              selectedImage={this.state.uploadedImage || this.state.selectedMedia}
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
