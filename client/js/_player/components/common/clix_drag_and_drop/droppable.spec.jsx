import React        from 'react';
import { shallow }  from 'enzyme';

import { Droppable }       from './droppable';

describe('clix drag and drop', () => {

  let result;
  let props;

  beforeEach(() => {
    props = {
      connectDragSource: comp => comp,
      connectDragPreview: () => {},
      isDragging: false,
      className: 'classname',
      hide: false,
      showWhileDragging: true,
      style: {},
      droppable: {
        text: 'droppable text',
      }
    };

    result = shallow(<Droppable {...props} />);
  });

  it('renders', () => {
    expect(result.find('.classname').length).toBe(1);
    expect(result.length).toBe(1);
    expect(result.find('.classname').props().dangerouslySetInnerHTML.__html).toBe('droppable text');
  });

  it('hides when it should be hidden', () => {
    props.hide = true;
    result = shallow(<Droppable {...props} />);
    expect(result.find('.is-hidden').length).toBe(1);

    props.hide = false;
    props.isDragging = true;
    props.showWhileDragging = false;
    result = shallow(<Droppable {...props} />);
    expect(result.find('.is-hidden').length).toBe(1);
  });

});
