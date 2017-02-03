import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react-addons-test-utils';
import wrapInDndContext     from '../../../../specs_support/dnd_wrapper';
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

  it('renders', () => {
    expect(result).toBeDefined();
  });

  it('renders the children', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("child");
  });
});
