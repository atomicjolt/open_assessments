import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react/lib/ReactTestUtils';
import wrapInDndContext     from '../../../specs_support/dnd_wrapper';
import DraggableWord        from './draggable_word';

describe('draggable word', () => {
  var result, props, WrappedComponent;
  beforeEach(() => {
    props = {
      id: 1,
      isDragging: true,
      style: {},
      material: "child"
    };
    WrappedComponent = wrapInDndContext(DraggableWord);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  it('renders with opacity', () => {
    var draggableWord = TestUtils.findRenderedDOMComponentWithClass(result, 'draggable-word');

    expect(draggableWord).toBeDefined();
    expect(draggableWord.attributes.style.textContent).toContain("opacity: 1");
  });

  it('renders the children', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("child");
  });
});
