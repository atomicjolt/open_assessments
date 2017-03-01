import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import FileUpload   from './file_upload';

describe('file upload component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {};
    result = TestUtils.renderIntoDocument(<FileUpload {...props} />);
  });

  it('does something', () => {

  });
});
