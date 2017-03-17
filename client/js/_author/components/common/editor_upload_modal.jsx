import React from 'react';
import Modal from 'react-modal';
import Loader from './dot_loader';

const tagNameMap = {
  audio: 'Audio',
  img: 'Image',
  video: 'Video',
};

export default function EditorUploadModal(props) {
  let name = props.mediaName;

  if (props.inProgress) {
    name = <Loader />;
  }

  if (props.error) {
    name = <div className="au-c-error-text">Error: {props.error}</div>;
  }

  return (
    <Modal
      overlayClassName="au-c-wysiwyg-modal-background"
      className="au-c-wysiwyg-modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel={`Insert ${tagNameMap[props.mediaType]} Modal`}
    >
      <div className="au-c-wysiwyg-modal__header">
        <h3 className="au-c-wysiwyg-modal__title">
          Insert {tagNameMap[props.mediaType]}
        </h3>
        <button onClick={props.closeModal} className="au-c-wysiwyg-modal__close">
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
              onChange={e => props.uploadMedia(e.target.files[0])}
              id="fileid"
              type="file"
            />
            <label htmlFor="fileid">
              <i className="material-icons">find_in_page</i>
            </label>
          </div>
        </div>
      </div>

      <div className="au-c-wysiwyg-modal__footer">
        <button
          onClick={props.closeModal}
          className="au-u-right  au-c-btn au-c-btn--sm au-c-btn--gray"
        >
          Cancel
        </button>
        <button
          onClick={() => { props.insertMedia(); }}
          className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-sm"
        >
          OK
        </button>
      </div>
    </Modal>
  );
}

EditorUploadModal.propTypes = {
  isOpen: React.PropTypes.bool,
  closeModal: React.PropTypes.func.isRequired,
  mediaType: React.PropTypes.string,
  mediaName: React.PropTypes.string,
  insertMedia: React.PropTypes.func.isRequired,
  uploadMedia: React.PropTypes.func,
  inProgress: React.PropTypes.bool,
  error: React.PropTypes.string,
};
