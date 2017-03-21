import React                                        from 'react';
import ReactDOM                                     from 'react-dom';
import TestUtils                                    from 'react-addons-test-utils';

import wrapInDndContext                             from '../../../../../specs_support/dnd_wrapper';
import { FillTheBlank }                             from './fill_the_blank';
import { __RewireAPI__ as FillTheBlankRewireApi }   from './fill_the_blank';

describe('fill the blank', () => {
  var result, props, WrappedComponent;
  beforeEach(() => {
    props = {
      answers: [{
        id: 1,
        text: "Word1"
      }],
      question: "<p>word1</p><div class=\"interaction-placeholder\"></div><p>word2</p>",
      selectAnswer: () => {},
      linkWord: () => {},
    };

    FillTheBlankRewireApi.__Rewire__('FillTheBlankWordChain', () => { return <div>WordChain</div>; })
    FillTheBlankRewireApi.__Rewire__('FillTheBlankWordDropZone', () => { return <div>WordCloud</div>; })
    WrappedComponent = wrapInDndContext(FillTheBlank);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  afterEach(() => {
    FillTheBlankRewireApi.__ResetDependency__('FillTheBlankWordChain');
    FillTheBlankRewireApi.__ResetDependency__('FillTheBlankWordDropZone');
  });

  it('renders the word chain', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("WordChain");
  });


  it('renders the word cloud', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("WordCloud");
  });
});
