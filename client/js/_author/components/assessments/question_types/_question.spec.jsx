import React            from 'react';
import { shallow }      from 'enzyme';
import { Question }     from './_question';
import shortAnswer      from './short_answer';

jest.mock('../../../../libs/assets.js');

describe('question component', () => {
  let props;
  let result;
  let movedUp;
  let itemUpdated;

  beforeEach(() => {
    movedUp = false;
    itemUpdated = false;
    props = {
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
        },
      },
      bankId: '',
      isActive: false,
      itemIndex: 7,
      topItem: false,
      bottomItem: false,
      reorderActive: false,
      updateItem: () => { itemUpdated = true; },
      updateChoice: () => {},
      activateItem: () => {},
      toggleReorder: () => {},
      deleteAssessmentItem: () => {},
      moveItem: () => { movedUp = true; },
      uploadedAssets: () => {},
      makeReflection: () => {},
      createChoice: () => {},
    };

    result = shallow(<Question {...props} />);
  });

  it('handles moveQuestionUp', () => {
    expect(movedUp).toBeFalsy();
    result.instance().moveQuestionUp();
    expect(movedUp).toBeTruthy();
  });

  it('handles moveQuestionDown', () => {
    expect(movedUp).toBeFalsy();
    result.instance().moveQuestionDown();
    expect(movedUp).toBeTruthy();
  });

  it('handles updateItem', () => {
    expect(itemUpdated).toBeFalsy();
    result.instance().updateItem({ text: 'asdf' });
    expect(itemUpdated).toBeTruthy();
  });

  it('shows renders Multiple Choice', () => {
    props.item.type = 'multipleChoice';
    result = shallow(<Question {...props} />);

    const multipleChoice = result.find('MultipleChoice');
    expect(multipleChoice.length).toBe(1);
  });

  it('shows renders Audio Upload', () => {
    props.item.type = 'audioUpload';
    result = shallow(<Question {...props} />);

    const audioUpload = result.find('AudioUpload');

    expect(audioUpload.length).toBe(1);
  });

  it('shows renders fileUpload', () => {
    props.item.type = 'fileUpload';
    result = shallow(<Question {...props} />);

    const fileUpload = result.find('FileUpload');
    expect(fileUpload.length).toBe(1);
  });

  it('shows renders shortAnswer', () => {
    props.item.type = 'shortAnswer';
    result = shallow(<Question {...props} />);

    const shortAns = result.find(shortAnswer);
    expect(shortAns.length).toBe(1);
  });

  it('returns correct value from getClassName', () => {
    props.isActive = true;
    result = shallow(<Question {...props} />);

    const div = result.find('.is-active');
    expect(div.length).toBe(1);
  });
});
