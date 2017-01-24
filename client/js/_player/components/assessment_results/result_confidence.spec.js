import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import ResultConfidence   from './result_confidence';

describe('result confidence', function() {
  var Subject = (<ResultConfidence settings={{}} level={"Just A Guess"} />);
  var result = TestUtils.renderIntoDocument(Subject);

  it('renders the confidence levels', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Just A Guess");
  });

});
