import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react-addons-test-utils';

import FileUpload   from './file_upload';

let fileUpload;
let subject;
let props;
describe('file upload', () => {
  beforeEach(() => {
    props = {
      selectAnswer: () => {},
      localizedStrings: {
        uploadFile: 'Upload file'
      }
    };
    spyOn(props, 'selectAnswer');
    fileUpload = TestUtils.renderIntoDocument(<FileUpload {...props} />);
    subject = ReactDOM.findDOMNode(fileUpload);
  });

  it('calls select answer on change', () => {
    TestUtils.Simulate.change(subject.childNodes[1]);
    expect(props.selectAnswer).toHaveBeenCalled();
  });

  it('only allows single upload', () => {
    expect(subject.outerHTML).not.toContain('multiple');
  });
});
