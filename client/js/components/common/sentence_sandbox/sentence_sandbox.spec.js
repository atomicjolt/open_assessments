import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react/lib/ReactTestUtils';

import SentenceSandbox      from './sentence_sandbox';

describe('sentence sandbox', () => {
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

    result = TestUtils.renderIntoDocument(<SentenceSandbox {...props} />);
  });

  it('renders the word chain', () => {
    var startBlock = TestUtils.findRenderedDOMComponentWithClass(result, 'start-block');

    expect(startBlock).toBeDefined();
  });

  it('renders the word cloud', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Word Cloud");
  });
});
