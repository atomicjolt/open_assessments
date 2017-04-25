import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import { NotFound }       from './not_found';

describe('not_found', function() {
  var result;

  beforeEach(()=>{
    result = TestUtils.renderIntoDocument(
      <NotFound
        localizedStrings={{notFound:{notFound:"Not Found"}}}/>
    );
  });

  it('renders a not found message', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toEqual('Not Found');
  });

});
