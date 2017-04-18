import React            from 'react';
import { shallow }      from 'enzyme';
import EditButton       from './edit_button';

describe('edit_button component', () => {
  let props;
  let result;
  let focused;

  beforeEach(() => {
    focused = false;
    props = {
      assessment: {
        isPublished: false,
      },
      onFocus: () => { focused = true; },
    };
    result = shallow(<EditButton {...props} />);
  });

  it('matches the snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('handles the onFocus function', () => {
    expect(focused).toBeFalsy();
    result.find('button').simulate('focus');
    expect(focused).toBeTruthy();
  });
});
