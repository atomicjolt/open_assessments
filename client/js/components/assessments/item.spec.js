import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import Item               from './item';

describe('item', function() {

  var question = {
    title:"Test Question Title"
  };
  var currentItemIndex = 0;
  var assessmentKind = "SUMMATIVE";
  var assessment = {};
  var questionCount = 10;
  var nextQuestion = () => {};
  var previousQuestion = () => {};
  var submitAssessment = () => {};

  var result;
  var subject;

  var renderItem = () => {
    result = TestUtils.renderIntoDocument(<Item
      question={question}
      currentItemIndex={currentItemIndex}
      questionCount={questionCount}
      assessment={assessment}
      nextQuestion = {nextQuestion}
      prevQuestion = {previousQuestion}
      submitAssessment = {submitAssessment}
      assessment_kind={assessmentKind}
    />);
    subject = ReactDOM.findDOMNode(result);
  };

  // Reset variables to default and render an item
  beforeEach(() => {
    question = {
      title:"Test Question Title"
    };
    currentItemIndex = 0;
    assessmentKind = "SUMMATIVE";
    assessment = {};
    questionCount = 10;
    nextQuestion = () => {};
    previousQuestion = () => {};
    submitAssessment = () => {};

    renderItem();
  });



  it('renders an item', () => {
    expect(subject.textContent).toContain("Test Question Title");
  });

  it("renders submit button on last question", () => {
    currentItemIndex = 9;
    renderItem();
    expect(subject.textContent).toContain("Submit");
  });

  it("disables next button on last question", () => {
    currentItemIndex = 9;
    renderItem();

    expect(subject.innerHTML).toContain('<button class="next-btn" disabled="">');
    expect(subject.innerHTML).not.toContain('<button class="prev-btn" disabled="">');
  });

  it("disables previous button on first question", () => {
    expect(subject.innerHTML).toContain('<button class="prev-btn" disabled="">');
    expect(subject.innerHTML).not.toContain('<button class="next-btn" disabled="">');
  });
});
