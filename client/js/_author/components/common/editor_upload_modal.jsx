import React            from 'react';
import Modal            from 'react-modal';
import _                from 'lodash';
import Loader           from './dot_loader';
import SearchMedia      from './search_media';
import LanguageSelect   from '../common/language_dropdown';

const tagNameMap = {
  audio: 'Audio',
  img: 'Image',
  video: 'Video',
};

export default class EditorUploadModal extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool,
    closeModal: React.PropTypes.func.isRequired,
    mediaType: React.PropTypes.string,
    mediaName: React.PropTypes.string,
    insertMedia: React.PropTypes.func.isRequired,
    uploadMedia: React.PropTypes.func,
    inProgress: React.PropTypes.bool,
    error: React.PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      uploadedImage: null,
      description: '',
      altText: '',
      license: '',
      copyright: '',
      baseScrollHeight: null,
    };
  }

  areaResize() {
    const minRows = 1;
    this.refs[`modal_textarea_${this.props.id}`].rows = minRows;
    const scrollHeight = this.refs[`modal_textarea_${this.props.id}`].scrollHeight;
    if (!this.state.baseScrollHeight) { this.setState({ baseScrollHeight: scrollHeight }); }
    const rows = Math.ceil((scrollHeight - (this.state.baseScrollHeight || scrollHeight)) / 17);
    this.refs[`modal_textarea_${this.props.id}`].rows = rows + minRows;
  }

  addMedia() {
    const metaData = {
      description: this.state.description,
      altText: this.state.altText,
      license: this.state.license,
      copyright: this.state.copyright,
    };
    this.props.insertMedia(this.state.uploadedImage, metaData);
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
          <div style={{ display: this.state.uploadedImage ? 'none' : 'block' }}>
            <div className="au-c-drop-zone__answers__label">Select an Image</div>
            <SearchMedia
              media={this.props.media}
              loading={this.props.loading}
            />
          </div>

          <div className="au-o-flex-center  au-u-mb-md">
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
          <div style={{ display: this.state.uploadedImage ? 'block' : 'none' }}>
            <div className="au-c-input au-c-input-label--left">
              <label htmlFor={`upload_desc_${this.props.id}`}>Description</label>
              <div className="au-c-input__contain">
                <textarea
                  ref={`modal_textarea_${this.props.id}`}
                  className="au-c-textarea au-c-text-input--smaller"
                  id={`upload_desc_${this.props.id}`}
                  type="text"
                  tabIndex="0"
                  onBlur={e => this.setState({ description: e.target.value })}
                  onChange={() => this.areaResize()}
                  rows="1"
                />
                <div className="au-c-input__bottom" />
              </div>
            </div>
            <div className="au-c-input au-c-input-label--left">
              <label htmlFor={`upload_alt_text_${this.props.id}`}>Alt-Text</label>
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--smaller"
                  id={`upload_alt_text_${this.props.id}`}
                  type="text"
                  tabIndex="0"
                  onBlur={e => this.setState({ altText: e.target.value })}
                />
                <div className="au-c-input__bottom" />
              </div>
            </div>
            <div className="au-c-input au-c-input-label--left">
              <label htmlFor={`upload_license_${this.props.id}`}>License</label>
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--smaller"
                  id={`upload_license_${this.props.id}`}
                  type="text"
                  tabIndex="0"
                  onBlur={e => this.setState({ license: e.target.value })}
                />
                <div className="au-c-input__bottom" />
              </div>
            </div>
            <div className="au-c-input au-c-input-label--left">
              <label htmlFor={`upload_copyright_${this.props.id}`}>Copyright</label>
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--smaller"
                  id={`upload_copyright_${this.props.id}`}
                  type="text"
                  tabIndex="0"
                  onBlur={e => this.setState({ copyright: e.target.value })}
                />
                <div className="au-c-input__bottom" />
              </div>
            </div>
          </div>
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
