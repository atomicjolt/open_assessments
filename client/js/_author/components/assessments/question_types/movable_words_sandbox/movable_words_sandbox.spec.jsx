import React            from 'react';
import { shallow }      from 'enzyme';
import MovableWords    from './movable_words_sandbox';
import AudioLimit       from '../question_common/audio_limit';
import Feedback         from '../question_common/single_feedback';
import Option           from './option';
import AddOption        from './add_option';

describe('the movable words sandbox component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
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
      },
      updateItem: () => { calledFunc = true; },
      createChoice: () => {},
      updateChoice: () => {},
      deleteChoice: () => {},
      selectChoice: () => {},
      blurOptions: () => { calledFunc = true; },
      isActive: false,
      activeChoice: '',
      save: () => {},
      language: 'eng',
    };

    result = shallow(<MovableWords {...props} />);
  });

  it('renders the component', () => {
    expect(result.find('.au-c-movable__audio-settings').length).toBe(1);
  });

  it('renders AudioLimit', () => {
    expect(result.find(AudioLimit)).toBeDefined();
  });

  it('renders Feedback', () => {
    expect(result.find(Feedback)).toBeDefined();
  });

  it('renders option', () => {
    expect(result.find(Option)).toBeDefined();
  });

  it('renders AddOption', () => {
    expect(result.find(AddOption)).toBeDefined();
  });

  it('executes blurOptions', () => {
    expect(calledFunc).toBeFalsy();
    result.find('div').at(0).simulate('blur');
    expect(calledFunc).toBeTruthy();
  });

  it('handles Blur', () => {
    expect(calledFunc).toBeFalsy();
    result.instance().handleBlur({ target: { value: '' } });
    expect(calledFunc).toBeTruthy();
  });
});
