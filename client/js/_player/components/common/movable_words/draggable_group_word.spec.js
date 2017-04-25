import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react-addons-test-utils';
import wrapInDndContext     from '../../../../../specs_support/dnd_wrapper';
import DraggableGroupWord   from './draggable_group_word';

describe('draggable group word', () => {
  var result, props, WrappedComponent;
  beforeEach(() => {
    props = {
      id: 1,
      isGroupDragging: false,
      material: "child"
    };
    WrappedComponent = wrapInDndContext(DraggableGroupWord);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  it('alters the opacity if dragging', () => {
    var draggableWord = TestUtils.findRenderedDOMComponentWithClass(result, 'draggable-group-word');

    expect(draggableWord).toBeDefined();
    expect(draggableWord.attributes.style.textContent).toContain("opacity: 1")

    props.isGroupDragging = true;
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
    draggableWord = TestUtils.findRenderedDOMComponentWithClass(result, 'draggable-group-word');
    expect(draggableWord.attributes.style.textContent).toContain("opacity: 0");
  });

  it('renders the children', () => {
    result = TestUtils.renderIntoDocument(
      <WrappedComponent {...props} />
    );

    expect(ReactDOM.findDOMNode(result).textContent).toContain("child");
  });
});
