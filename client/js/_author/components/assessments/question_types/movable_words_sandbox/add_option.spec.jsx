import React from 'react';
import { shallow }  from 'enzyme';
import AddOption from './add_option';

describe('add option component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      updateChoice: () => { calledFunc = true; },
    };
    result = shallow(<AddOption {...props} />);
  });

  it('renders the add option component', () => {
    expect(result.find('.au-o-flex-center').length).toBe(1);
  });

  it('renders one input', () => {
    expect(result.find('input').length).toBe(1);
  });

  it('renders default value for input as Add Option', () => {
    const input = result.find('input');
    expect(input.at(0).nodes[0].props.defaultValue).toBe('Add Option');
  });

  it('calls the updateChoice prop', () => {
    expect(calledFunc).toBeFalsy();
    result.find('.au-c-answer').simulate('click');
    expect(calledFunc).toBeTruthy();
  });
});
