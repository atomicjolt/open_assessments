import React              from 'react';
import { shallow }        from 'enzyme';
import TargetPlaceholder  from './target_placeholder';

describe('target_placeholder component', () => {
  let props;
  let result;
  let changer;

  beforeEach(() => {
    changer = false;
    props = {
      onClick: () => { changer = true; },
    };
    result = shallow(<TargetPlaceholder {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('div is clicked and changes value', () => {
    result.find('.au-c-drag-and-drop__target-image-placeholder').simulate('click');
    expect(changer).toBeTruthy();
  });
});
