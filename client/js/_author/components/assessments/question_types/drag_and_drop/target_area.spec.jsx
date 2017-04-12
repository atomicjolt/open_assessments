import React          from 'react';
import { shallow }    from 'enzyme';
import TargetArea     from './target_area';

describe('target_area component', () => {
  let props;
  let result;
  let uploadedMedia;
  let zoneNew;

  beforeEach(() => {
    uploadedMedia = false;
    zoneNew = false;
    props = {
      loadingMedia: false,
      images: {},
      question: {
        target: {},
        zones: {},
      },
      uploadMedia: () => { uploadedMedia = true; },
      editZone: () => { zoneNew = true; },
    };
    result = shallow(<TargetArea {...props} />);
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
});
