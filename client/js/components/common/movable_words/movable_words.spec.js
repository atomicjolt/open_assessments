import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react/lib/ReactTestUtils';
import wrapInDndContext     from '../../../../specs_support/dnd_wrapper';
import { MovableWords }     from './movable_words';

describe('movable words', () => {
  var result, props;
  beforeEach(() => {
    props = {
      wordChain: [1],
      answers: [{
        id: 1,
        text: "asdf"
      }],
      selectAnswer: () => {}
    };

    const WrappedComponent = wrapInDndContext(MovableWords);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  it('renders the word chain', () => {
    var startBlock = TestUtils.findRenderedDOMComponentWithClass(result, 'start-block');

    expect(startBlock).toBeDefined();
  });

  it('renders the word cloud', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Word Cloud");
  });
});
