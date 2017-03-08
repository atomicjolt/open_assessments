import React        from 'react';
import { shallow }  from 'enzyme';
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
    result = shallow(<AudioUpload {...props} />);
  });

  it('renders 3 spans', () => {
    const spans = result.find('span');
    expect(spans.length).toBe(3);
  });

  it('handles updateItem through handleBlur', () => {
    expect(itemUpdated).toBeFalsy();
    const input = {
      target: {
        value: 7,
      },
    };
    result.instance().handleBlur(input);
    expect(itemUpdated).toBeTruthy();
  });

  it('runs the getAudioLimit static function', () => {
    const inputs = result.find('.author--c-text-input--smaller');
    expect(inputs.at(0).nodes[0].props.value).toBe('7900');
  });

  it('runs the getAudioLimit static function', () => {
    props.item.question.timeValue = {
      hours: '7',
      minutes: '70',
      seconds: '700',
    };
    const newResult = shallow(<AudioUpload {...props} />);
    const secondInput = newResult.find('.author--c-text-input--smaller');
    expect(secondInput.at(0).nodes[0].props.value).toBe('30100');
  });
});
