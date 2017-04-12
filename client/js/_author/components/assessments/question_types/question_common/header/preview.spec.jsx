import React          from 'react';
import { shallow }    from 'enzyme';
import Preview        from './preview';

describe('preview header component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      togglePreview: () => { calledFunc = true; },
    };
    result = shallow(<Preview {...props} />);
  });

  it('renders the component', () => {
    expect(result.find('.au-c-question-icons--reorder').length).toBe(1);
  });

  it('renders a clickable button', () => {
    expect(calledFunc).toBeFalsy();
    const button = result.find('button');
    expect(button.length).toBe(1);
    result.find('.au-c-btn--sm').simulate('click');
    expect(calledFunc).toBeTruthy();
  });
});
