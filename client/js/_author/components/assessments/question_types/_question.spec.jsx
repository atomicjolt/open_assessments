import React            from 'react';
import _                from 'lodash';
import TestUtils        from 'react-addons-test-utils';
import genusTypes       from '../../../../constants/genus_types.js';
import Question         from './_question';

fdescribe('question component', () => {
  let props;
  let result;
  let movedUp;
  let itemUpdated;

  beforeEach(() => {
    movedUp = false;
    itemUpdated = false;
    props = {
      item: {
        id: '76',
        displayName: {
          text: 'IMATITLESPEC',
          languageTypeId: '639-2%3AENG%40ISO',
        },
        description: {
          text: 'IMADESCRIPTION',
        },
        genusTypeId: '',
        index: 1,
        question: {
          shuffle: true,
        },
      },
      isActive: false,
      itemIndex: 7,
      topItem: false,
      bottomItem: false,
      reorderActive: false,
      updateItem: () => {itemUpdated = true},
      updateChoice: () => {},
      activateItem: () => {},
      toggleReorder: () => {},
      deleteAssessmentItem: () => {},
      moveItem: () => {movedUp = true},
    };
    result = TestUtils.renderIntoDocument(<Question {...props} />);
  });

  it('handles moveQuestionUp', () => {
    expect(result.props.itemIndex).toBe(7);
    expect(movedUp).toBeFalsy();
    result.moveQuestionUp();
    expect(movedUp).toBeTruthy();
  });

  it('handles moveQuestionDown', () => {
    expect(movedUp).toBeFalsy();
    result.moveQuestionDown();
    expect(movedUp).toBeTruthy();
  });

  it('handles updateItem', () => {
    expect(itemUpdated).toBeFalsy();
    result.updateItem();
    expect(itemUpdated).toBeTruthy();
  });

  it('shows renders Multiple Choice', () => {
    props.item.genusTypeId = genusTypes.item.multipleChoice;
    result = TestUtils.renderIntoDocument(<Question {...props} />);
    const multipleChoice = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'c-question__answers--maintain',
    );
    expect(multipleChoice).toBeDefined();
  });

  it('shows renders Audio Upload', () => {
    props.item.genusTypeId = genusTypes.item.audioUpload;
    result = TestUtils.renderIntoDocument(<Question {...props} />);
    const audioUpload = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'c-file-upload__audio-settings',
    );
    expect(audioUpload).toBeDefined();
  });

  it('shows renders fileUpload', () => {
    props.item.genusTypeId = genusTypes.item.fileUpload;
    result = TestUtils.renderIntoDocument(<Question {...props} />);
    const fileUpload = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'c-question__feedback',
    );
    expect(fileUpload).toBeDefined();
  });

  it('shows renders shortAnswer', () => {
    props.item.genusTypeId = genusTypes.item.shortAnswer;
    result = TestUtils.renderIntoDocument(<Question {...props} />);
    const shortAnswer = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'c-short-answer__answers',
    );
    expect(shortAnswer).toBeDefined();
  });

  it('returns correct value from getClassName', () => {
    const getClassName = result.getClassName();
    expect(getClassName).toBe('');
    props.isActive = true;
    result = TestUtils.renderIntoDocument(<Question {...props} />);
    const secondGetClassName = result.getClassName();
    expect(secondGetClassName).toBe('is-active');
  });
});
