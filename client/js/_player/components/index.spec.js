"use strict";

import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react-addons-test-utils';
import { Index }            from './index';
import appHistory           from "../history";

describe('index', function() {
  var result, props, scrollParentToTopCalled, sendSizeCalled;


  beforeEach(()=>{
    scrollParentToTopCalled = false;
    sendSizeCalled = false;

    props = {
      loadAssessment: () => {},
      scrollParentToTop: () => { scrollParentToTopCalled = true; },
      sendSize: () => { sendSizeCalled = true; },
      availableLocales: () => {}
    };

    result = TestUtils.renderIntoDocument(<Index {...props} />);
    spyOn(appHistory, 'push');
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

  it('calls the send size comm handler action', () => {
    expect(sendSizeCalled).toBe(true);
  });

  it('calls the scroll parent to top comm handler action', () => {
    expect(scrollParentToTopCalled).toBe(true);
  });

  afterEach(()=>{
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(result).parentNode);
  });

});
