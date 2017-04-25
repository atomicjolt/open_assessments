import React              from 'react';
import { shallow }        from 'enzyme';
import MovableFillBlank   from './movable_fill_blank';
import Feedback           from '../question_common/single_feedback';
import Option             from './option';
import Add                from '../question_common/add_option';

describe('movable_fill_blank component', () => {
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
        answers: [],
      },
      updateItem: () => { calledFunc = true; },
      createChoice: () => { calledFunc = true; },
      updateChoice: () => { calledFunc = true; },
      deleteChoice: () => { calledFunc = true; },
      selectChoice: () => { calledFunc = true; },
      blurOptions: () => { calledFunc = true; },
      isActive: false,
      activeChoice: '',
      language: 'eng',
    };
    result = shallow(<MovableFillBlank {...props} />);
  });

  it('renders the component', () => {
    expect(result.find('.au-c-fill-in-the-blank__answers').length).toBe(1);
  });

  it('renders two feedback components', () => {
    expect(result.find(Feedback).length).toBe(2);
  });

  it('renders option', () => {
    expect(result.find(Option)).toBeDefined();
  });

  it('renders add option', () => {
    expect(result.find(Add)).toBeDefined();
  });

  it('executes blurOptions', () => {
    expect(calledFunc).toBeFalsy();
    result.find('.au-no-outline').simulate('blur');
    expect(calledFunc).toBeTruthy();
  });

  it('runs props.updateItem', () => {
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
    option.at(0).nodes[0].props.setActiveChoice();
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
    props.isActive = true;
    result = shallow(<MovableFillBlank {...props} />);
    const add = result.find(Add);
    add.at(0).nodes[0].props.createChoice();
    expect(calledFunc).toBeTruthy();
  });
});
