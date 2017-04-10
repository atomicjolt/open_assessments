import React            from 'react';
import ReactDOM         from 'react-dom';
import { shallow }      from 'enzyme';
import renderer         from 'react-test-renderer';
import DragArea         from './drag_area';
import DropObject       from './drop_object';

jest.mock('../../../../../libs/assets.js');

describe('drag area component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      dropObjects: {
        object: {
          id: '7',
        },
      },
      zones: {},
      images: {},
      uploadMedia: () => {},
      updateDropObject: () => {},
      loadingMedia: false,
    };
    result = shallow(<DragArea {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('sets state via setActive attr in DropObject', () => {
    expect(result.instance().state.activeObject).toBe(null);
    const button = result.find(DropObject);
    const clickableDiv = button.find('can_you_find_this');
    // button.find('.can_you_find_this').simulate('click');
    expect(result.instance().state.activeObject).toBe('7');
  });
});
