import React                                        from 'react';
import ReactDOM                                     from 'react-dom';
import TestUtils                                    from 'react-addons-test-utils';

import wrapInDndContext                             from '../../../../../specs_support/dnd_wrapper';
import FillTheBlankWordChain                        from './fill_the_blank_word_chain';
import { __RewireAPI__ as WordChainRewireAPI }      from './fill_the_blank_word_chain';

class WordDropZoneMock extends React.Component {
  render() {
    return <div>WordDropZone</div>
  }
}

class DraggableWordMock extends React.Component {
  render() {
    return <div>DraggableWord</div>
  }
}

describe('fill the blank word chain', () => {
  var result, props, WrappedComponent;
  beforeEach(() => {
    props = {
      sentenceWords: [
        "<p>word1</p>",
        "<p>word2</p>",
        "<p class='interaction-placeholder'></p>"
      ],
      selectAnswer: () => {},
      linkWord: () => {},
    };

    WordChainRewireAPI.__Rewire__('FillTheBlankWordDropZone', WordDropZoneMock)
    WordChainRewireAPI.__Rewire__('FillTheBlankDraggableWord', DraggableWordMock)

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
