import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import _                from 'lodash';
import MultipleChoice   from './multiple_choice';

describe('multiple choice component', () => {
  let props;
  let result;
  let choiceUpdated;

  beforeEach(() => {
    choiceUpdated = false;
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
          choices: {
            '15': {
              id: '15',
              order: 0,
              isCorrect: false,
            },
            'bob': {
              id: 'bob',
              order: 1,
              isCorrect: false,
            },
            'taco': {
              id: 'taco',
              order: 2,
              isCorrect: false,
            },
          },
        },
        answers: [{}],
      },
      updateItem: () => {choiceUpdated = true},
      updateChoice: () => {choiceUpdated = true},
      isActive: false,
    };
    result = TestUtils.renderIntoDocument(<MultipleChoice {...props} />);
  });

  it('renders', () => {
    const div = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'author--c-question__answers--maintain',
    );
    expect(div).toBeDefined();
  });

  it('calls updateChoice', () => {
    expect(choiceUpdated).toBeFalsy();
    result.addNewChoice(props.item.id);
    expect(choiceUpdated).toBeTruthy();
  });

  it('the props.updateChoice function', () => {
    expect(choiceUpdated).toBeFalsy();
    result.moveChoice(props.item.question.choices['bob']);
    expect(choiceUpdated).toBeTruthy();
  });
});
