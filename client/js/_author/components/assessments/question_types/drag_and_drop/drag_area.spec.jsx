import React                    from 'react';
import { shallow, mount }       from 'enzyme';
import DragArea                 from './drag_area';
import { languages }            from '../../../../../constants/language_types';

jest.mock('../../../../../libs/assets.js');

describe('drag area component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      dropObjects: {
        object: {
          id: '7',
          images: {
            [languages.languageTypeId.english]: { text: 'fake_image' }
          }
        },
      },
      zones: {},
      images: {},
      uploadMedia: () => {},
      updateDropObject: () => {},
      loadingMedia: false,
      language: languages.languageTypeId.english
    };
    result = shallow(<DragArea {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('sets state via setActive attr in DropObject', () => {
    const nonShallow = mount(<DragArea {...props} />);
    expect(nonShallow.instance().state.activeObject).toBe(null);
    const button = nonShallow.find('.au-set-active');
    button.simulate('click');
    expect(nonShallow.instance().state.activeObject).toBe('7');
  });

  it('sets state via show modal button', () => {
    expect(result.instance().state.showModal).toBeFalsy();
    const button = result.find('button');
    button.simulate('click');
    expect(result.instance().state.showModal).toBeTruthy();
  });
});
