import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react-addons-test-utils';
import wrapInDndContext     from '../../../../specs_support/dnd_wrapper';
import ItemChain            from './item_chain';

describe('item chain', () => {
  var result, props, WrappedComponent;
  beforeEach(() => {
    props = {
      wordChain: [1],
      answersById: {
        1: {
          id: 1,
          material: "asdf"
        }
      },
      linkWord: () => {}
    };
    WrappedComponent = wrapInDndContext(ItemChain);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  it('renders the word chain', () => {
    var startBlock = TestUtils.findRenderedDOMComponentWithClass(result, 'c-word--starter');
    var endDropZone = TestUtils.findRenderedDOMComponentWithClass(result, 'c-drop-zone');

    expect(endDropZone).toBeDefined();
    expect(startBlock).toBeDefined();
    expect(ReactDOM.findDOMNode(result).textContent).toContain("asdf");
  });
});
