import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import AssessmentItems  from './assessment_items';
import Stub             from '../../../../specs_support/stub';

describe('assessment items component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      items: [{
        id: '76',
        displayName: {
          text: 'IMATITLESPEC',
          languageTypeId: '639-2%3AENG%40ISO',
        },
        description: {
          text: 'IMADESCRIPTION',
        },
        genusTypeId: '3',
        index: 1,
        question: {
          shuffle: true,
        },
      }],
      updateChoice: () => {},
      updateAnswer: () => {},
      moveItem: () => {},
    };
    result = TestUtils.renderIntoDocument(<Stub><AssessmentItems {...props} /></Stub>);
  });

  it('renders question component', () => {
    const questionComponent = TestUtils.scryRenderedDOMComponentsWithClass(
      result,
      'c-question__content',
    );
    expect(questionComponent.length).not.toBe(0);
  });
});
