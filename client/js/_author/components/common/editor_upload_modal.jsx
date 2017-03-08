import React from 'react';
import Modal from 'react-modal';

const tagNameMap = {
  audio: 'Audio',
  img: 'Image',
  video: 'Video',
};

export default function EditorUploadModal(props) {
  function insertMedia() {
    if (!props.mediaUrl) return;

    let editorContent;

    switch (props.mediaType) {
      case 'img':
        editorContent = `<img src="${props.mediaUrl}" />`;
        break;

      case 'audio':
      case 'video':
        editorContent = `<${props.mediaType}><source src="${props.mediaUrl}" /></${props.mediaType}>`;
        break;

      default:
        editorContent = `<video><source src="${props.mediaUrl}" /></video>`;
    }

    props.editor.insertContent(editorContent);
  }

  return (
    <Modal
      overlayClassName="author--c-wysiwyg-modal-background"
      className="author--c-wysiwyg-modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
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
          onClick={() => { insertMedia(); props.closeModal(); }}
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
  mediaUrl: React.PropTypes.string,
  mediaType: React.PropTypes.string,
  mediaName: React.PropTypes.string,
};
