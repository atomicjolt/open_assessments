import React          from 'react';
import { shallow }    from 'enzyme';
import Option         from './option';

describe('the option component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      selectChoice: () => { calledFunc = true; },
      deleteChoice: () => { calledFunc = true; },
      updateChoice: () => { calledFunc = true; },
      choice: {
        wordType: 'verb',
        id: '',
        text: '',
      },
      index: 7,
      isActive: false,
    };
    result = shallow(<Option {...props} />);
  });

  it('renders option component', () => {
    expect(result.find('label').length).toBe(2);
  });

  it('called the selectChoice prop', () => {
    expect(calledFunc).toBeFalsy();
    result.find('.au-o-flex-center').simulate('click');
    expect(calledFunc).toBeTruthy();
  });

  it('called the deleteChoice prop', () => {
    expect(calledFunc).toBeFalsy();
    result.find('button').simulate('click');
    expect(calledFunc).toBeTruthy();
  });

  it('called the updateChoice prop', () => {
    expect(calledFunc).toBeFalsy();
    result.find('#word_drop_down').simulate('change', { target: { value: 'Preposition' } });
    expect(calledFunc).toBeTruthy();
  });

  it('renders a button', () => {
    expect(result.find('button').length).toBe(1);
  });

  it('renders an input with choice.text', () => {
    const input = result.find('input');
    expect(input.at(0).nodes[0].props.defaultValue).toBe('');
  });

  it('renders a select with text input', () => {
    const select = result.find('select [selected]');
    expect(select.value).toBe(props.wordType);
  });
});
