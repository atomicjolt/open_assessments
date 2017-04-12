import React            from 'react';
import { shallow }      from 'enzyme';
import AddZoneDropdown  from './add_zone_dropdown';

describe('drag_and_drop component', () => {
  let props;
  let result;
  let toggled;
  let addedRegion;
  let addedImage;

  beforeEach(() => {
    addedRegion = false;
    addedImage = false;
    toggled = false;
    props = {
      active: false,
      text: 'Spec',
      toggle: () => { toggled = true; },
      addByRegion: () => { addedRegion = true; },
      addByImage: () => { addedImage = true; },
    };
    result = shallow(<AddZoneDropdown {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('toggles on click', () => {
    expect(toggled).toBeFalsy();
    const button = result.find('.au-c-btn--dropdown');
    button.simulate('click');
    expect(toggled).toBeTruthy();
  });

  it('adds by region on click', () => {
    expect(addedRegion).toBeFalsy();
    const button = result.find(`#reg_${props.text}`);
    button.simulate('click');
    expect(addedRegion).toBeTruthy();
  });

  it('adds by image on click', () => {
    expect(addedImage).toBeFalsy();
    const btn = result.find(`#image_${props.text}`);
    btn.simulate('click');
    expect(addedImage).toBeTruthy();
  });
});
