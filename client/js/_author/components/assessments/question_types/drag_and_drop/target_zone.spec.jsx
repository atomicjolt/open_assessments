import React          from 'react';
import { shallow }    from 'enzyme';
import TargetZone     from './target_zone';

describe('target_zone component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      target: {},
      zones: {},
      editZone: () => {},
      openModal: () => {},
    };
    result = shallow(<TargetZone {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('handles setting state', () => {
    expect(result.instance().state.activeZone).toBe(null);
    result.instance().state.activeZone = '7';
    expect(result.instance().state.activeZone).toBe('7');
    result.find('.au-c-drag-and-drop__target-image').simulate('click');
    expect(result.instance().state.activeZone).toBe(null);
  });
});
