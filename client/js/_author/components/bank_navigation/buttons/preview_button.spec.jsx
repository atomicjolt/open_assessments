import React            from 'react';
import { shallow }      from 'enzyme';
import PreviewButton    from './preview_button';

describe('preview_button component', () => {
  let props;
  let result;
  let focused;

  beforeEach(() => {
    focused = false;
    props = {
      assessment: {
        isPublished: false,
        bankId: '',
        id: '',
      },
      onFocus: () => { focused = true; },
    };

    result = shallow(<PreviewButton {...props} />);
  });

  it('matches the snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls onFocus function', () => {
    expect(focused).toBeFalsy();
    result.find('button').simulate('focus');
    expect(focused).toBeTruthy();
  });

  it('handles onclick', () => {
    spyOn(window, 'open');
    result.find('button').simulate('click', { stopPropagation: () => {} });
    expect(window.open).toHaveBeenCalled();
  });
});
