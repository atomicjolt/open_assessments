import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import { shallow }      from 'enzyme'
import AssessmentItems  from './assessment_items';

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
      },
      {
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
    result = shallow(<AssessmentItems {...props} />);
  });

  it('renders question component', () => {
    const questionComponent = result.find('Question');
    expect(questionComponent.length).toBe(2);
  });
});
