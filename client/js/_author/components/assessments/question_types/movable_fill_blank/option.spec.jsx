import React                from 'react';
import { shallow }          from 'enzyme';
import Option               from './option';
import WordType             from '../question_common/word_type_dropdown';
import Radio                from '../question_common/option_radio';

describe('option component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      text: '',
      id: '',
      updateChoice: () => { calledFunc = true; },
      deleteChoice: () => { calledFunc = true; },
      setActiveChoice: () => { calledFunc = true; },
      isCorrect: false,
      isActive: false,
      itemId: '',
      wordType: '',
    };

    result = shallow(<Option {...props} />);
  });

  it('renders the mulitple choice options component', () => {
    expect(result.find('.au-o-flex-center').length).toBe(1);
  });

  it('renders wordType component', () => {
    expect(result.find(WordType).length).toBe(1);
  });

  it('renders Radio component', () => {
    expect(result.find(Radio).length).toBe(1);
  });

  it('renders clickable button in component', () => {
    expect(calledFunc).toBeFalsy();
    const button = result.find('button');
    expect(button).toBeDefined();
    button.simulate('click');
    expect(calledFunc).toBeTruthy();
  });

  it('runs setActiveChoice', () => {
    expect(calledFunc).toBeFalsy();
    result.find('.au-o-flex-center').simulate('click');
    expect(calledFunc).toBeTruthy();
  });

  it('runs updateChoice', () => {
    expect(calledFunc).toBeFalsy();
    const wordType = result.find(WordType);
    wordType.at(0).nodes[0].props.updateChoice();
    expect(calledFunc).toBeTruthy();
  });
});
