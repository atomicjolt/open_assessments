import React          from 'react';
import { shallow }    from 'enzyme';
import AddOption      from './add_option';

describe('the add_option component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      createChoice: () => { calledFunc = true; },
    };
    result = shallow(<AddOption {...props} />);
  });

  it('renders one label', () => {
    expect(result.find('label').length).toBe(1);
  });

  it('runs createChoice', () => {
    expect(calledFunc).toBeFalsy();
    result.find('.au-c-answer--add').simulate('click');
    expect(calledFunc).toBeTruthy();
  });
});
