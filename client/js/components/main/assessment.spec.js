import React                   from "react";
import ReactDOM                from "react-dom";
import TestUtils               from "react/lib/ReactTestUtils";
import Helper                  from "../../../specs_support/helper";

import appHistory              from "../../history";
import { Assessment }          from "./assessment";
import * as AssessmentActions  from "../../actions/assessment";

describe("assessment", function() {
  var props;
  var allQuestions,
    assessment,
    assessmentViewed,
    checkedResponses,
    currentItem,
    outcomes,
    previousQuestions,
    progress,
    questionCount,
    questionsPerPage,
    responses,
    result,
    settings,
    subject,
    submitAssessment;

  // Props are reset to these default values between each test. To use
  // a modified prop in your test case, modify props.myProp in your test case and
  // re-render dom element with  result = TestUtils.renderIntoDocument. Then
  // proceed to test your result.
  beforeEach(() => {
    allQuestions = () => [{
      timeSpent:0,
      outcomes:{shortOutcome:"", longOutcome:""},
      material: "Test Material",
      correct:[{
        id:"testCorrect",
        value:"100"
      }],
      points_possible:"1",
      question_type:"multiple_choice_question",
      answers:[
        {
          id:"testCorrect",
          material:"test question material"
        },
        {
          id:"testIncorrect",
          material:"test question material"
        }
      ],
      title:"Test Question Title",
      id:"TestQuestionID"
    }];

    assessment = {
      title: "Test Title"
    };

    checkedResponses = [];

    currentItem = 5;

    questionsPerPage = 1;

    outcomes = () => {};

    progress = {
      currentItemIndex:0
    };

    questionCount = 10;

    responses = [];
    settings = {
      user_id      : 0,
      max_attempts : 1,
      eid          : "external_identifier",
      src_url      : "http://www.openassessments.com/api/assessments/55.xml",
      questions_per_page:1,
      assessment_kind: "SUMMATIVE"
    };

    props = {
      allQuestions:allQuestions(),
      assessment,
      assessmentViewed: () => {},
      checkedResponses,
      currentItem,
      hideLMSNavigation: () => {},
      nextQuestions: () => {},
      outcomes:outcomes(),
      previousQuestions: () => {},
      progress,
      questionCount,
      questionsPerPage,
      responses,
      scrollParentToTop: () => {},
      sendSize: () => {},
      settings,
      submitAssessment: () => {}
    };

    spyOn(props, "nextQuestions");
    spyOn(props, "previousQuestions");
    spyOn(props, "submitAssessment");
    spyOn(appHistory, "push");

    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    jasmine.Ajax.uninstall();
  });

  it("Calls nextQuestions when the next button is clicked", () => {
    let button = TestUtils.findRenderedDOMComponentWithClass(result, "next-btn");
    TestUtils.Simulate.click(button);
    expect(props.nextQuestions).toHaveBeenCalled();
  });

  it("Calls previousQuestions when the previous button is clicked", () => {
    let button = TestUtils.findRenderedDOMComponentWithClass(result, "prev-btn");
    TestUtils.Simulate.click(button);

    expect(props.previousQuestions).toHaveBeenCalled();
  });

  it("Calls submitAssessment when the submit button is clicked", () => {
    props.currentItem = 9;
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    let button = TestUtils.findRenderedDOMComponentWithClass(result, "btn-check-answer");
    TestUtils.Simulate.click(button);

    expect(props.submitAssessment).toHaveBeenCalled();
  });

  it("renders the assessment", () => {
    expect(subject).toBeDefined();
  });

  it("renders a question", () => {
    expect(subject.innerHTML).toContain("Test Question Title");
  });

  it("redirects to assessment result when assessment has been submitted", () => {
    props.progress.assessmentResult = "done";
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);

    expect(appHistory.push).toHaveBeenCalledWith("assessment-result");
  });

  it("renders submit button on last page of items", () => {
    props.currentItem = 9;
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);

    expect(subject.textContent).toContain("Submit");
  });

  it("disables next button on last page of items", () => {
    props.currentItem = 9;
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);

    expect(subject.innerHTML).toContain('<button class="next-btn" disabled="">');
    expect(subject.innerHTML).not.toContain('<button class="prev-btn" disabled="">');
  });

  it("disables previous button on first page of items", () => {
    props.currentItem = 0;
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);

    expect(subject.innerHTML).toContain('<button class="prev-btn" disabled="">');
    expect(subject.innerHTML).not.toContain('<button class="next-btn" disabled="">');
  });

});
