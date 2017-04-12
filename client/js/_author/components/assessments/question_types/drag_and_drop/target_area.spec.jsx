import React          from 'react';
import { shallow }    from 'enzyme';
import TargetArea     from './target_area';

describe('target_area component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      loadingMedia: false,
      images: {},
      question: {
        target: {},
        zones: {},
      },
      uploadMedia: () => {},
      editZone: () => {},
    };
    result = shallow(<TargetArea {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });
});
