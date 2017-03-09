import React       from 'react';
import { shallow } from 'enzyme';
import ReactModal  from 'react-modal';
import Modal       from './editor_upload_modal';

describe('editor upload modal', () => {
  let result, props, functionCalled, fileUploaded;
  beforeEach(() => {
    functionCalled = false;
    fileUploaded = null;
    props = {
      isOpen: true,
      closeModal: () => { functionCalled = true; },
      mediaType: 'img',
      mediaName: 'filename.jpg',
      insertMedia: () => { functionCalled = true; },
      uploadMedia: (file) => { fileUploaded = file },
      inProgress: false,
    }
    result = shallow(<Modal {...props} />);
  });

  it('shows the modal', () => {
    props.isOpen = false;
    result = shallow(<Modal {...props} />);
    expect(result.find(ReactModal).length).toBe(1);
    expect(result.find(ReactModal).props().isOpen).toBeFalsy();
    props.isOpen = true;
    result = shallow(<Modal {...props} />);
    expect(result.find(ReactModal).props().isOpen).toBeTruthy();
    expect(result.find(ReactModal).props().onRequestClose).toBe(props.closeModal);
  });

  it('displays modal title correctly', () => {
    expect(result.find('h3').text()).toContain('Insert Image');
    props.mediaType = 'video';
    result = shallow(<Modal {...props} />);
    expect(result.find('h3').text()).toContain('Insert Video');
    props.mediaType = 'audio';
    result = shallow(<Modal {...props} />);
    expect(result.find('h3').text()).toContain('Insert Audio');
  });

  it('calls closeModal when the close button is clicked', () => {
    result.find('.au-c-wysiwyg-modal__close').simulate('click');
    expect(functionCalled).toBeTruthy();
  });

  it('calls closeModal when the cancel button is clicked', () => {
    result.find('.au-c-btn--gray').simulate('click');
    expect(functionCalled).toBeTruthy();
  });

  it('calls insertMedia when the OK button is clicked', () => {
    result.find('.au-c-btn--maroon').simulate('click');
    expect(functionCalled).toBeTruthy();
  });

  it('calls uploadMedia when a file is uploaded', () => {
    result.find('input').simulate('change', { target: { files: ["file"] } });
    expect(fileUploaded).toBe('file');
  });

  it('displays the loader when inProgress is true', () => {
    props.inProgress = true;
    result = shallow(<Modal {...props} />);
    expect(result.find('dotLoader').length).toBe(1);
  });

  it('displays the error when it is loading and there is an error', () => {
    props.inProgress = true;
    props.error = 'error message';
    result = shallow(<Modal {...props} />);
    expect(result.find('.au-c-error-text').length).toBe(1);
    expect(result.find('.au-c-error-text').text()).toContain('error message');
  });

  it('displays the error when it is not loading and there is an error', () => {
    props.error = 'error message';
    result = shallow(<Modal {...props} />);
    expect(result.find('.au-c-error-text').length).toBe(1);
    expect(result.find('.au-c-error-text').text()).toContain('error message');
  });
});
