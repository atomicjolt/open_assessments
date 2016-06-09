import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import Start              from './start';

describe('start', function() {
  var result;

  beforeEach(() => {
    var settings = {
      assessmentKind: "summative",
      srcUrl: "asdf",
      images: {}
    };
    jasmine.clock().install();
    jasmine.Ajax.install();
    // jasmine.Ajax.requests.mostRecent().respondWith({
    //   "status"        : 200,
    //   "contentType"     : "text/plain",
    //   "responseText" : "{}"
    // });
    jasmine.clock().tick();
    jasmine.clock().tick();
    result = TestUtils.renderIntoDocument(<Start />);
  });

  afterEach(() => {

    jasmine.clock().uninstall();
    jasmine.Ajax.uninstall();
  });

  it('renders the start page', function(){
    expect(ReactDOM.findDOMNode(result)).toBeDefined();
  });
});
