"use strict";

import React       from 'react';
import ReactDOM    from 'react-dom';
import TestUtils   from 'react/lib/ReactTestUtils';
import { Index }   from './index';
import appHistory  from "../history";

describe('index', function() {
  var Subject;
  var result;
  var props;

  beforeEach(()=>{
    props = {
      loadAssessment:() => {}
    };
    result = TestUtils.renderIntoDocument(<Index {...props} />);
    spyOn(appHistory, 'push')
  });

  it('renders the index', function() {
    expect(ReactDOM.findDOMNode(result)).toBeDefined();
  });

  it('redirects to assessment when start is disabled', () => {
    props.enableStart = false;
    result = TestUtils.renderIntoDocument(<Index {...props} />);

    expect(appHistory.push).toHaveBeenCalledWith("assessment");
  });

  it('redirects to retries exceeded when tries >= allowed tries', () => {
    props.maxAttempts = 1;
    props.userAttempts = 1;
    result = TestUtils.renderIntoDocument(<Index {...props} />);

    expect(appHistory.push).toHaveBeenCalledWith("retries-exceeded");
  });

  afterEach(()=>{
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(result).parentNode);
  });

});
