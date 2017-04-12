import React          from 'react';
import { shallow }    from 'enzyme';
import Option         from './option';

describe('option component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      id: '7',
      text: '',
      wordType: '',
      answerOrder: 1,
      itemCount: 3,
      isActive: false,
      selectChoice: () => { calledFunc = true; },
      updateChoice: () => { calledFunc = true; },
      deleteChoice: () => { calledFunc = true; },
    };
    result = shallow(<Option {...props} />);
  });

  it('renders option component', () => {
    expect(result.find('label').length).toBe(2);
  });

  it('renders Button', () => {
    expect(result.find('button')).toBeDefined();
  });

  it('called the selectChoice prop', () => {
    expect(calledFunc).toBeFalsy();
    result.find('.au-o-flex-center').simulate('click');
    expect(calledFunc).toBeTruthy();
  });

  it('called the updateChoice prop', () => {
    expect(calledFunc).toBeFalsy();
    result.find('#option_text_7').simulate('blur', { target: { value: 'verb' } });
    expect(calledFunc).toBeTruthy();
  });

  it('called the updateChoice prop from input', () => {
    expect(calledFunc).toBeFalsy();
    result.find('input').simulate('blur', { target: { value: 'noun' } });
    expect(calledFunc).toBeTruthy();
  });

  it('called the deleteChoice prop', () => {
    expect(calledFunc).toBeFalsy();
    result.find('button').simulate('click');
    expect(calledFunc).toBeTruthy();
  });

  it('sets default value for input', () => {
    const input = result.find('input');
    expect(input.at(0).nodes[0].props.defaultValue).toBe(props.wordType);
  });

  it('renders a select with text input', () => {
    const select = result.find('select');
    expect(select.props().value).toBe(props.answerOrder);
  });
});
