import React                  from 'react';
import { shallow }            from 'enzyme';
import MovableWordSentence   from './movable_word_sentence';
import Option                 from './option';
import Add                    from '../question_common/add_option';
import Feedback               from '../question_common/single_feedback';

describe('movable word sentece component', () => {
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
          choices: {
            choice: {
              id: '4',
            },
          },
          shuffle: true,
          timeValue: {
            hours: '1',
            minutes: '70',
            seconds: '100',
          },
        },
      },
      updateChoice: () => { calledFunc = true; },
      deleteChoice: () => { calledFunc = true; },
      createChoice: () => { calledFunc = true; },
      selectChoice: () => { calledFunc = true; },
      blurOptions:  () => { calledFunc = true; },
      updateItem:   () => { calledFunc = true; },
      isActive: false,
      activeChoice: '',
      save: () => {},
      language: 'eng',
    };
    result = shallow(<MovableWordSentence {...props} />);
  });

  it('renders the movable word sentence component', () => {
    expect(result.find('.au-c-movable__answers'));
  });

  it('renders Option', () => {
    expect(result.find(Option)).toBeDefined();
  });

  it('renders Add Option', () => {
    expect(result.find(Add)).toBeDefined();
  });

  it('renders two Feedback components', () => {
    expect(result.find(Feedback).length).toBe(2);
  });

  it('calls function updateItem', () => {
    expect(calledFunc).toBeFalsy();
    const feedback = result.find(Feedback);
    feedback.at(0).nodes[0].props.updateItem();
    expect(calledFunc).toBeTruthy();
  });

  it('calls function updateChoice', () => {
    expect(calledFunc).toBeFalsy();
    const option = result.find(Option);
    option.at(0).nodes[0].props.updateChoice();
    expect(calledFunc).toBeTruthy();
  });

  it('calls function selectChoice', () => {
    expect(calledFunc).toBeFalsy();
    const option = result.find(Option);
    option.at(0).nodes[0].props.selectChoice();
    expect(calledFunc).toBeTruthy();
  });

  it('calls function deleteChoice', () => {
    expect(calledFunc).toBeFalsy();
    const option = result.find(Option);
    option.at(0).nodes[0].props.deleteChoice();
    expect(calledFunc).toBeTruthy();
  });

  it('calls function createChoice', () => {
    expect(calledFunc).toBeFalsy();
    const add = result.find(Add);
    add.at(0).nodes[0].props.createChoice();
    expect(calledFunc).toBeTruthy();
  });

  it('handles the onBlur function', () => {
    expect(calledFunc).toBeFalsy();
    result.find('.au-c-movable__answers').simulate('blur', { target: { value: 'Preposition' } });
    expect(calledFunc).toBeTruthy();
  });
});
