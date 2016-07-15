import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react/lib/ReactTestUtils';
import wrapInDndContext     from '../../../../specs_support/dnd_wrapper';
import WordChain            from './word_chain';

describe('word chain', () => {
  var result, props, WrappedComponent;
  beforeEach(() => {
    props = {
      wordChain: [1],
      answersById: {
        1: {
          id: 1,
          text: "asdf"
        }
      },
      linkWord: () => {}
    };
    WrappedComponent = wrapInDndContext(WordChain);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  it('renders the word chain', () => {
    var startBlock = TestUtils.findRenderedDOMComponentWithClass(result, 'start-block');
    var endDropZone = TestUtils.findRenderedDOMComponentWithClass(result, 'end-drop-zone');

    expect(endDropZone).toBeDefined();
    expect(startBlock).toBeDefined();
    expect(ReactDOM.findDOMNode(result).textContent).toContain("asdf");
  });
});
