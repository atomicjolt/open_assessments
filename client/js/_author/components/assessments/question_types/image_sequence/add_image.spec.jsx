import React                from 'react';
import { shallow }          from 'enzyme';
import { AddImage }         from './add_image';

describe('add image component', () => {
  let props;
  let result;
  let calledFunc;
  let calledFunction;

  beforeEach(() => {
    calledFunc = false;
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
              id: '3',
            },
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
      uploadScopeId: '7',
      uploadMedia: () => {calledFunc = true},
      updateChoice: () => {},
      uploadedAssets: {
        uploadScopeId: '7',
      },
    };
    result = shallow(<AddImage {...props} />);
  });

  it('renders add image component', () => {
    expect(result.find('.au-c-image-sequence-answer-add').length).toBe(1);
  });

  it('renders clickable button', () => {
    expect(result.find('button').length).toBe(1);
    const button = result.find('input');
    expect(calledFunc).toBeFalsy();
    result.find('#newImageId').simulate('change', { target: { files: 'SPECTASTIC' } });
    expect(calledFunc).toBeTruthy();
  });

});
