import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import AudioUpload  from './audio_upload';

describe('audio_upload component', () => {
  let props;
  let result;
  let itemUpdated;

  beforeEach(() => {
    itemUpdated = false;
    props = {
      updateItem: () => {itemUpdated = true},
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
          timeValue: {
            hours: '1',
            minutes: '70',
            seconds: '100',
          },
        },
      },
    };
    result = TestUtils.renderIntoDocument(<AudioUpload {...props} />);
  });

  it('renders 3 spans', () => {
    const spans = TestUtils.scryRenderedDOMComponentsWithTag(result, 'span');
    expect(spans.length).toBe(3);
  });

  it('handles updateItem through handleBlur', () => {
    expect(itemUpdated).toBeFalsy();
    const input = {
      target: {
        value: 7,
      },
    };
    result.handleBlur(input);
    expect(itemUpdated).toBeTruthy();
  });

  it('runs the getAudioLimit static function', () => {
    const inputs = TestUtils.scryRenderedDOMComponentsWithClass(
      result,
      'au-c-text-input--smaller',
    );
    expect(inputs[0].value).toBe('7900');
  });

  it('runs the getAudioLimit static function', () => {
    props.item.question.timeValue = {
      hours: '7',
      minutes: '70',
      seconds: '700',
    };
    const newResult = TestUtils.renderIntoDocument(<AudioUpload {...props} />);
    const secondInput = TestUtils.scryRenderedDOMComponentsWithClass(
      newResult,
      'au-c-text-input--smaller',
    );
    expect(secondInput[0].value).toBe('30100')
  });
});
