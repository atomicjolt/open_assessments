import React from 'react';
import Modal from 'react-modal';
import Loader from './dot_loader';

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
      description: '',
      altText: '',
      license: '',
      copyright: '',
    };
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
          <button onClick={this.props.closeModal} className="au-c-wysiwyg-modal__close">
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="au-c-wysiwyg-modal__main">
          <div className="au-o-flex-center  au-u-mb-md">
            <span className="au-c-wysiwyg-media__label">File</span>
            <div className="au-c-wysiwyg-media__source-text" tabIndex="0">
              {name}
            </div>
            <div className="au-c-input--file  au-u-ml-sm">
              <input
                onChange={e => this.props.uploadMedia(e.target.files[0])}
                id="fileid"
                type="file"
              />
              <label htmlFor="fileid">
                <i className="material-icons">find_in_page</i>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="au-c-input au-c-input-label--left">
            <label htmlFor={`upload_desc_${this.props.id}`}>Description</label>
            <div className="au-c-input__contain">
              <input
                className="au-c-text-input au-c-text-input--smaller"
                id={`upload_desc_${this.props.id}`}
                type="text"
                tabIndex="0"
                onBlur={e => this.setState({ description: e.target.value })}
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

        <div className="au-c-wysiwyg-modal__footer">
          <button
            onClick={this.props.closeModal}
            className="au-u-right  au-c-btn au-c-btn--sm au-c-btn--gray"
          >
            Cancel
          </button>
          <button
            onClick={() => this.props.insertMedia()}
            className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-sm"
          >
            OK
          </button>
        </div>
      </Modal>
    );
  }
}
