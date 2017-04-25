import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import { shallow }  from 'enzyme';
import FileUpload   from './file_upload';
import Stub         from '../../../../../specs_support/stub';

describe('file upload component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      updateItem: () => {},
      item: {
        bankId: '',
        id: '76',
        displayName: {
          text: 'IMATITLESPEC',
          languageTypeId: '639-2%3AENG%40ISO',
        },
        description: {
          text: 'IMADESCRIPTION',
        },
        type: '',
        index: 1,
        question: {
          shuffle: true,
          timeValue: {
            hours: '1',
            minutes: '70',
            seconds: '100',
          },
        },
      },
      language: 'eng',
    };
    result = shallow(<FileUpload {...props} />);
  });

  it('renders component', () => {
    expect(result).toBeDefined();
  });
});
