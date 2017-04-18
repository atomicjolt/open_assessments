import React          from 'react';
import { shallow }    from 'enzyme';
import PublishButton  from './publish_button';

describe('PublishButton component', () => {
  let props;
  let result;
  let focused;
  let toggling;

  beforeEach(() => {
    focused = false;
    toggling = false;
    props = {
      togglePublishAssessment: () => { toggling = true; },
      onFocus: () => { focused = true; },
      assessment: {
        isToggling: true,
      },
    };

    result = shallow(<PublishButton {...props} />);
  });

  it('matches a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls onFocus', () => {
    expect(focused).toBeFalsy();
    result.find('button').simulate('focus');
    expect(focused).toBeTruthy();
  });

  it('calls togglePublishAssessment on click', () => {
    expect(toggling).toBeFalsy();
    props.assessment.isToggling = false;
    result = shallow(<PublishButton {...props} />);
    result.find('button').simulate('click', { stopPropagation: () => {} });
    expect(toggling).toBeTruthy();
  });
});
