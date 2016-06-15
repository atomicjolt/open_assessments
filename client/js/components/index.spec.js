"use strict";

import React       from 'react';
import ReactDOM    from 'react-dom';
import TestUtils   from 'react/lib/ReactTestUtils';
import { Index }       from './index';

describe('index', function() {
  var Subject;
  var result;

  beforeEach(()=>{
    var props = {
      loadAssessment:() => {}
    };
    result = TestUtils.renderIntoDocument(<Index {...props} />);
  });

  it('renders the index', function() {
    expect(ReactDOM.findDOMNode(result)).toBeDefined();
  });

  afterEach(()=>{
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(result).parentNode);
  });
});
