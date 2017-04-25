import React            from 'react';
import { shallow }      from 'enzyme';
import { DragAndDrop }  from './_drag_and_drop';

jest.mock('../../../../../libs/assets.js');

describe('drag_and_drop component', () => {
  let props;
  let result;
  let uploadedMedia;

  beforeEach(() => {
    uploadedMedia = false;
    props = {
      item: {
        id: '',
        bankId: '',
        question: {
          id: '7',
          dropObjects: {},
          zones: {},
        },
      },
      images: {},
      updateItem: () => {},
      addMediaToQuestion: () => { uploadedMedia = true; },
      updateChoice: () => {},
      loadingMedia: false,
      language: 'eng',
    };
    result = shallow(<DragAndDrop {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('executes the upload media function', () => {
    expect(uploadedMedia).toBeFalsy();
    result.instance().uploadMedia();
    expect(uploadedMedia).toBeTruthy();
  });
});
