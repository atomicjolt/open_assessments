import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react-addons-test-utils';
import wrapInDndContext     from '../../../../../specs_support/dnd_wrapper';
import { MovableWords, __RewireAPI__ as RewireAPI }     from './movable_words';

describe('movable words', () => {
  var result, props;
  beforeEach(() => {
    props = {
      wordChain: [1],
      answers: [{
        id: 1,
        material: "asdf"
      }],
      selectAnswer: () => {}
    };

    const WrappedComponent = wrapInDndContext(MovableWords);
    RewireAPI.__Rewire__('ItemChain', () => { return <div>WordChain</div>});
    result = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  it('renders the word chain', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("WordChain");
  });

  it('renders the word cloud', () => {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("asdf");
  });
});
