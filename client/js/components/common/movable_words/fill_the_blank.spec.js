import React                                        from 'react';
import ReactDOM                                     from 'react-dom';
import TestUtils                                    from 'react/lib/ReactTestUtils';

import wrapInDndContext                              from '../../../../specs_support/dnd_wrapper';
import { FillTheBlank }                             from './fill_the_blank';
import { __RewireAPI__ as FillTheBlankRewireApi }   from './fill_the_blank';

describe('fill the blank', () => {
  var result, props, WrappedComponent;
  beforeEach(() => {
    props = {
      answers: [{
        id: 1,
        text: "asdf"
      }],
      question: "<p>word1</p><div class=\"interaction-placeholder\"></div><p>word2</p>",
      selectAnswer: () => {}
    };

    FillTheBlankRewireApi.__Rewire__('FillTheBlankWordChain', () => { return <div>WordChain</div>; })

    WrappedComponent = wrapInDndContext(FillTheBlank);
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  afterEach(() => {
    FillTheBlankRewireApi.__ResetDependency__('FillTheBlankWordChain');
  });

  it('renders the word chain', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("WordChain");
  });


  it('renders the word cloud', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Word Cloud");
  });
});
