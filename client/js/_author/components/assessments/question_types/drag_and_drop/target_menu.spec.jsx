import React          from 'react';
import { shallow }    from 'enzyme';
import TargetMenu     from './target_menu';

describe('target_menu component', () => {
  let props;
  let result;
  let openedModal;

  beforeEach(() => {
    openedModal = false;
    props = {
      openModal: () => { openedModal = true; },
      toggleAdd: () => {},
      addedByRegion: () => {},
      hasTarget: false,
      addType: '',
    };
    result = shallow(<TargetMenu {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('button opens modal', () => {
    expect(openedModal).toBeFalsy();
    result.find('button').simulate('click');
    expect(openedModal).toBeTruthy();
  });
});
