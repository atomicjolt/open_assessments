import React              from 'react';
import ReactDOM           from 'react-dom';
import { createStore }    from 'redux';

import TestUtils          from 'react-addons-test-utils';
import { CheckUnderstanding } from './check_understanding';

describe('check understanding', function() {

  describe('formative start screen', ()=>{
    let props = {
      title          : "Test Title",
      maxAttempts    : 2,
      userAttempts   : 1,
      assessmentId   : 24,
      assessmentKind : "FORMATIVE",
      lti            : { lti_role : "User" },
      icon           : "test.svg"
    };

    var result = TestUtils.renderIntoDocument(<CheckUnderstanding {...props} />);
    it('renders the formative start Screen', function() {
      expect(ReactDOM.findDOMNode(result).textContent).toContain("Test Title");
      expect(ReactDOM.findDOMNode(result).textContent).toContain("Start Quiz");
    });
  });

  describe('show what you know start screen', ()=>{
    let props = {
      title          : "Test Title",
      maxAttempts    : 2,
      userAttempts   : 1,
      assessmentId   : 24,
      assessmentKind : "SHOW_WHAT_YOU_KNOW",
      lti            : { lti_role : "User" },
      icon           : "test.svg",
    };

    var result = TestUtils.renderIntoDocument(<CheckUnderstanding {...props}/>);
    it('renders the show what you know start screen', function() {
      const subject = ReactDOM.findDOMNode(result).textContent;
      expect(subject).toContain("Take this pre-test to see what you already know about the concepts");
      expect(subject).toContain("Start Pre-test");
    });
  });

  describe('summative start screen', ()=>{
    let props = {
      title : "Test Title",
      maxAttempts : 2,
      userAttempts : 0,
      eid : "asdf",
      is_lti : true,
      assessmentId : 24,
      assessmentKind : "SUMMATIVE",
      ltiRole : "User",
      icon : "test.svg",
      images : {},
      theme : {}
    };

    var result = TestUtils.renderIntoDocument(<CheckUnderstanding {...props} />);
    it('renders the summative start screen', function() {
      expect(ReactDOM.findDOMNode(result).textContent).toContain("You can take this quiz twice.");
      expect(ReactDOM.findDOMNode(result).textContent).toContain("1of 2");
      expect(ReactDOM.findDOMNode(result).textContent).toContain("Start Quiz");
    });

    it('renders a message if user has hit max attempts', function() {
      props.userAttempts = 2;
      result = TestUtils.renderIntoDocument(<CheckUnderstanding {...props} />);
      expect(ReactDOM.findDOMNode(result).textContent).toContain("Oops!You have already taken this quiz the maximum number of times");
    });

  });

});
