import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import Loading            from './loading';

describe('loading', function() {

  var result = TestUtils.renderIntoDocument(<Loading />);
  it('renders a loading assessment message', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Loading.");
  });

});
