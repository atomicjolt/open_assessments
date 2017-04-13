import React                from 'react';
import { shallow }          from 'enzyme';
import { AddImage }         from './add_image';

describe('add image component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      item: {
        bankId: '12',
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
          choices: {
            choice: {
              id: '4',
            },
          },
          shuffle: true,
          timeValue: {
            hours: '1',
            minutes: '70',
            seconds: '100',
          },
        },
        answers: [],
      },
      uploadMedia: () => {},
      updateChoice: () => {},
      createChoice: () => {},
    };
    result = shallow(<AddImage {...props} />);
  });

  it('renders add image component', () => {
    expect(result.find('.au-c-image-sequence-answer-add').length).toBe(1);
  });

});
