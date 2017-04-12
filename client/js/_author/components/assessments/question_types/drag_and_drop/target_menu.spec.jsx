import React          from 'react';
import ReactDOM       from 'react-dom';
import { shallow }    from 'enzyme';
import renderer       from 'react-test-renderer';
import TargetMenu     from './target_menu';

describe('target_menu component', () => {
  let props;
  let result;
  let uploadedMedia;
  let zoneNew;

  beforeEach(() => {
    uploadedMedia = false;
    zoneNew = false;
    props = {
      uploadMedia: () => {uploadedMedia = true},
      newZone: () => {zoneNew = true},
      images: {},
      loadingMedia: false,
      hasTarget: false,
    };
    result = shallow(<TargetMenu {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('handles the uploadMedia prop call', () => {
    expect(uploadedMedia).toBeFalsy();
    result.instance().replaceImage();
    expect(uploadedMedia).toBeTruthy();
  });

  it('handles the newZone prop call', () => {
    expect(zoneNew).toBeFalsy();
    result.instance().addByRegion();
    expect(zoneNew).toBeTruthy();
  });

  it('handles setting state', () => {
    expect(result.instance().state.add).toBe(null);
    expect(result.instance().state.showModal).toBeFalsy();
    result.find('button').simulate('click');
    expect(result.instance().state.showModal).toBeTruthy();
  });
});
