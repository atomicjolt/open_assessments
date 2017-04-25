import React        from 'react';
import { shallow }  from 'enzyme';
import AudioUpload  from './audio_upload';

describe('audio_upload component', () => {
  let props;
  let result;
  let itemUpdated;

  beforeEach(() => {
    itemUpdated = false;
    props = {
      updateItem: () => { itemUpdated = true; },
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
    result = shallow(<AudioUpload {...props} />);
  });

  it('handles updateItem through handleBlur', () => {
    expect(itemUpdated).toBeFalsy();
    const input = {
      target: {
        value: 7,
      },
    };
    result.instance().handleBlur(input);
    expect(itemUpdated).toBeTruthy();
  });
});
