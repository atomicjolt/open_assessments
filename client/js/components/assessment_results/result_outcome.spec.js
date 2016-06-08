import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from '../../../node_modules/react/lib/ReactTestUtils';
import ResultOutcome      from './result_outcome';

describe('result outcome', function() {

  var outcomes = {
    longOutcome: "Long",
    shortOutcome: "Short"
  };

  var Subject = (<ResultOutcome level={"Just A Guess"} outcomes={outcomes} correct={true}  />);
  var result = TestUtils.renderIntoDocument(Subject);

  it('renders the outcome', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("ShortLong");
  });

});
