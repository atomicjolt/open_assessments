import React            from 'react';
import _                from 'lodash';
import TestUtils        from 'react-addons-test-utils';
import genusTypes       from '../../../../constants/genus_types.js';
import Question         from './_question';
import { Provider }     from 'react-redux';
import { createStore }  from 'redux';

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
      uploadedAssets: () => {},
    };

    result = TestUtils.renderIntoDocument(
      <Provider store={createStore(()=>({ settings: {} }))}>
        <Question {...props} />
      </Provider>
    );
  });

  it('handles moveQuestionUp', () => {
    expect(movedUp).toBeFalsy();
    props.reorderActive = true;
    props.isActive = true;
    result = TestUtils.renderIntoDocument(
      <Provider store={createStore(()=>({ settings: {} }))}>
        <Question {...props} />
      </Provider>
    );
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(3);
    TestUtils.Simulate.click(buttons[0]);
    expect(movedUp).toBeTruthy();
  });

  it('handles moveQuestionDown', () => {
    expect(movedUp).toBeFalsy();
    props.reorderActive = true;
    props.isActive = true;
    result = TestUtils.renderIntoDocument(
      <Provider store={createStore(()=>({ settings: {} }))}>
        <Question {...props} />
      </Provider>
    );
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(3);
    TestUtils.Simulate.click(buttons[1]);
    expect(movedUp).toBeTruthy();
  });

  it('handles updateItem', () => {
    expect(itemUpdated).toBeFalsy();
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(result, 'input');
    expect(inputs.length).toBe(2);
    const input = inputs[0];
    TestUtils.Simulate.blur(input, { target: { value: 'NEWVALUE' }});
    expect(itemUpdated).toBeTruthy();
  });

  it('shows renders Multiple Choice', () => {
    props.item.type = 'multipleChoice';
    result = TestUtils.renderIntoDocument(
      <Provider store={createStore(()=>({ settings: {} }))}>
        <Question {...props} />
      </Provider>
    );
    const multipleChoice = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'author--c-question__answers--maintain',
    );
    expect(multipleChoice).toBeDefined();
  });

  it('shows renders Audio Upload', () => {
    props.item.type = 'audioUpload';
    result = TestUtils.renderIntoDocument(
      <Provider store={createStore(()=>({ settings: {} }))}>
        <Question {...props} />
      </Provider>
    );
    const audioUpload = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'author--c-file-upload__audio-settings',
    );
    expect(audioUpload).toBeDefined();
  });

  it('shows renders fileUpload', () => {
    props.item.type = 'fileUpload';
    result = TestUtils.renderIntoDocument(
      <Provider store={createStore(()=>({ settings: {} }))}>
        <Question {...props} />
      </Provider>
    );
    const fileUpload = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'author--c-question__feedback',
    );
    expect(fileUpload).toBeDefined();
  });

  it('shows renders shortAnswer', () => {
    props.item.type = 'shortAnswer';
    result = TestUtils.renderIntoDocument(
      <Provider store={createStore(()=>({ settings: {} }))}>
        <Question {...props} />
      </Provider>
    );
    const shortAnswer = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'author--c-short-answer__answers',
    );
    expect(shortAnswer).toBeDefined();
  });

  it('returns correct value from getClassName', () => {
    props.isActive = true;
    result = TestUtils.renderIntoDocument(
      <Provider store={createStore(()=>({ settings: {} }))}>
        <Question {...props} />
      </Provider>
    );
    const secondGetClassName = TestUtils.scryRenderedDOMComponentsWithClass(
      result,
      'is-active'
    );
    expect(secondGetClassName.length).toBe(1);
  });
});
