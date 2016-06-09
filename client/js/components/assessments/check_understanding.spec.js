import React              from 'react';
import ReactDOM           from 'react-dom';
import { createStore } from 'redux'

import TestUtils          from 'react/lib/ReactTestUtils';
import CheckUnderstanding from './check_understanding';

describe('check understanding', function() {

  describe('formative start screen', ()=>{
    let store = createStore({
      settings:{
        title : "Test Title",
        maxAttempts : 2,
        userAttempts : 1,
        eid : "asdf",
        isLti : true,
        assessmentId : 24,
        assessmentKind : "formative",
        ltiRole : "User",
        icon : "test.svg"
      }
    });

    var Subject = <CheckUnderstanding store={store} />
    var result = TestUtils.renderIntoDocument(Subject);
    it('renders the formative start Screen', function() {
      expect(React.findDOMNode(result).textContent).toContain("Test Title");
      expect(React.findDOMNode(result).textContent).toContain("Start Quiz");
    });
  });

  describe('show what you know start screen', ()=>{
    let store = createStore( () => ({
      settings: {
        title : "Test Title",
        maxAttempts : 2,
        userAttempts : 1,
        eid : "asdf",
        isLti : true,
        assessmentId : 24,
        assessmentKind : "show_what_you_know",
        ltiRole : "User",
        icon : "test.svg",
        images : {},
        theme : {}
      }
    }))


    var Subject = <CheckUnderstanding store={store} />
    var result = TestUtils.renderIntoDocument(Subject);
    it('renders the show what you know start screen', function() {
      expect(ReactDOM.findDOMNode(result).textContent).toContain("Take this pre-test to see what you already know about the concepts");
      expect(ReactDOM.findDOMNode(result).textContent).toContain("Start Pre-test");
    });
  });

  describe('summative start screen', ()=>{
    let store = createStore({
      settings:{
        title : "Test Title",
        maxAttempts : 2,
        userAttempts : 0,
        eid : "asdf",
        isLti : true,
        assessmentId : 24,
        assessmentKind : "summative",
        ltiRole : "User",
        icon : "test.svg",
      }
    })

    var result = TestUtils.renderIntoDocument(<CheckUnderstanding store={store} />);
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
