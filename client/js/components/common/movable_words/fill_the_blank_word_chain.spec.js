import React                                        from 'react';
import ReactDOM                                     from 'react-dom';
import TestUtils                                    from 'react/lib/ReactTestUtils';

import wrapInDndContext                             from '../../../../specs_support/dnd_wrapper';
import FillTheBlankWordChain                        from './fill_the_blank_word_chain';
import { __RewireAPI__ as WordChainRewireAPI }      from './fill_the_blank_word_chain';

describe('fill the blank word chain', () => {
  var result, props, WrappedComponent;
  beforeEach(() => {
    props = {
      sentenceChunks: [
        "<p>word1</p>",
        "<p>word2</p>"
      ],
      selectAnswer: () => {}
    };

    WordChainRewireAPI.__Rewire__('WordDropZone', () => { return <div>WordDropZone</div>; })
    WordChainRewireAPI.__Rewire__('DraggableWord', () => { return <div>DraggableWord</div>; })

    WrappedComponent = wrapInDndContext(FillTheBlankWordChain);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  afterEach(() => {
    WordChainRewireAPI.__ResetDependency__('WordDropZone');
    WordChainRewireAPI.__ResetDependency__('DraggableWord');
  });

  it('renders the word chain', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("word1");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("word2");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("WordDropZone");
  });

  it('renders a draggable word when selectedAnswer is present', () => {
    props.selectedAnswer = [1];
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
    expect(ReactDOM.findDOMNode(result).textContent).toContain("DraggableWord");
  });
});
