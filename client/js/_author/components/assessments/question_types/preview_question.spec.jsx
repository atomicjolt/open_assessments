import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import PreviewQuestion  from './preview_question';

describe('preview question component', () => {
  let props;
  let result;

  beforeEach(() => {
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
          timeValue: {
            hours: '1',
            minutes: '70',
            seconds: '100',
          },
        },
        settings: {},
        currentItemIndex: 12,
        questionResult: {},
        isUpdating: false,
      },
    };
    result = TestUtils.renderIntoDocument(<PreviewQuestion {...props} />);
  });

  it('item is defined', () => {
    expect(result.props.item).toBeDefined();
  });

  it('renders Item component', () => {
    const item = TestUtils.findRenderedDOMComponentWithClass(result, 'c-question-prompt');
    expect(item).toBeDefined();
  });

});
