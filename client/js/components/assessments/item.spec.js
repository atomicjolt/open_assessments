import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import Item               from './item';

fdescribe('item', function() {

  var question = {
    title:"Test Question Title"
  };
  var currentItemIndex = 0;

  var settings = {
    assessmentKind: "formative"
  };

  var assessment = {};
  var questionCount = 10;
  var result = TestUtils.renderIntoDocument(<Item
    question={question}
    currentItemIndex={currentItemIndex}
    settings={settings}
    questionCount={questionCount}
    assessment={assessment}
    nextQuestion = {() => {}}
    prevQuestion = {() => {}}
    submitAssessment = {() => {}}
  />);

  it('renders an item', function() {
    const subject = ReactDOM.findDOMNode(result);
    expect(subject.textContent).toContain("Test Question Title");
  });

  it("renders submit button on last question", () => {});
  it("disables next button on last question", () => {});
  it("disables previous button on first question", () => {});
  it("calls nextQuestion callback on next button click", () => {});
  it("calls prevQuestion callback on prev button click", () => {});
  it("calls submitAssessment callback on submit button click", () => {});
});
