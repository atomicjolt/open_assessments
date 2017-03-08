import React from 'react';
import Modal from 'react-modal';

const tagNameMap = {
  audio: 'Audio',
  img: 'Image',
  video: 'Video',
};

export default function EditorUploadModal(props) {
  return (
    <Modal
      overlayClassName="author--c-wysiwyg-modal-background"
      className="author--c-wysiwyg-modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel={`Insert ${tagNameMap[props.mediaType]} Modal`}
    >
      <div className="author--c-wysiwyg-modal__header">
        <h3 className="author--c-wysiwyg-modal__title">
          Insert {tagNameMap[props.mediaType]}
        </h3>
        <button onClick={props.closeModal} className="author--c-wysiwyg-modal__close">
          <i className="material-icons">close</i>
        </button>
      </div>

      <div className="author--c-wysiwyg-modal__main">
        <div className="author--o-flex-center  author--u-mb-md">
          <span className="author--c-wysiwyg-media__label">File</span>
          <div className="author--c-wysiwyg-media__source-text" tabIndex="0">
            {props.mediaName}
          </div>
          <div className="author--c-input--file  author--u-ml-sm">
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

      <div className="author--c-wysiwyg-modal__footer">
        <button
          onClick={props.closeModal}
          className="author--u-right  author--c-btn author--c-btn--sm author--c-btn--gray"
        >
          Cancel
        </button>
        <button
          onClick={() => { props.insertMedia(); props.closeModal(); }}
          className="author--c-btn author--c-btn--sm author--c-btn--maroon author--u-ml-sm"
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
  insertMedia: React.PropTypes.string,
};
