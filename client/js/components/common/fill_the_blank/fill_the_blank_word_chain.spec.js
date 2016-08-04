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
      sentenceWords: [
        "<p>word1</p>",
        "<p>word2</p>",
        "<p class='interaction-placeholder'></p>"
      ],
      selectAnswer: () => {}
    };

    WordChainRewireAPI.__Rewire__('FillTheBlankWordDropZone', () => { return <div>WordDropZone</div>; })
    WordChainRewireAPI.__Rewire__('FillTheBlankDraggableWord', () => { return <div>DraggableWord</div>; })

    WrappedComponent = wrapInDndContext(FillTheBlankWordChain);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  afterEach(() => {
    WordChainRewireAPI.__ResetDependency__('FillTheBlankWordDropZone');
    WordChainRewireAPI.__ResetDependency__('FillTheBlankDraggableWord');
  });

  it('renders the sentence words', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("word1");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("word2");
  });

  it('renders the dropzone', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("WordDropZone");
  });

  it('renders a draggable word when selectedAnswer is present', () => {
    props.selectedAnswer = [1];
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
    expect(ReactDOM.findDOMNode(result).textContent).toContain("DraggableWord");
  });
});
