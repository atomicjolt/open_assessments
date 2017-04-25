import React        from 'react';
import { shallow }  from 'enzyme';
import BackButton   from './back_button';

describe('back_button component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      handleClick: () => { calledFunc = true; },
    };
    result = shallow(<BackButton {...props} />);
  });

  it('matches the snapshot taken', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls the handleClick function onClick', () => {
    expect(calledFunc).toBeFalsy();
    result.find('button').simulate('click');
    expect(calledFunc).toBeTruthy();
  });
});
