import React            from 'react';
import { shallow }      from 'enzyme';
import DeleteButton     from './delete_button';

describe('delete_button component', () => {
  let props;
  let result;
  let focused;
  let deleted;

  beforeEach(() => {
    focused = false;
    deleted = false;
    props = {
      deleteAssessment: () => { deleted = true; },
      onFocus: () => { focused = true; },
      assessment: {
        isPublished: false,
        bankId: '',
        id: '',
      },
    };

    result = shallow(<DeleteButton {...props} />);
  });

  it('matches the snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls props onFocus', () => {
    expect(focused).toBeFalsy();
    result.find('button').simulate('focus');
    expect(result).toBeTruthy();
  });

  it('handles the deleteAssessment function', () => {
    expect(deleted).toBeFalsy();
    result.find('button').simulate('click', { stopPropagation: () => {} });
    expect(deleted).toBeTruthy();
  });
});
