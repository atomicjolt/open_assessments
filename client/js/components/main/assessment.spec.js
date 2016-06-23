import React                   from "react";
import ReactDOM                from "react-dom";
import TestUtils               from "react/lib/ReactTestUtils";
import Helper                  from "../../../specs_support/helper";

import appHistory              from "../../history";
import { Assessment }          from "./assessment";
import * as AssessmentActions  from "../../actions/assessment";

describe("assessment", function() {
  var result;
  var subject;
  var props;
  var settings;
  var assessment;
  var progress;
  var questionCount;
  var allQuestions;
  var outcomes;
  var assessmentViewed;
  var currentQuestion;

  beforeEach(() => {
    spyOn(appHistory, "push");

    settings = {
      user_id      : 0,
      max_attempts : 1,
      eid          : "external_identifier",
      src_url      : "http://www.openassessments.com/api/assessments/55.xml",
      view         : "SHOW_ONE",
      questions_per_section:1,
      assessment_kind: "SUMMATIVE"
    };

    assessment = {
      title: "Test Title"
    };

    progress = {
      currentItemIndex:0,
      answerMessageIndex:[]
    };

    currentQuestion = 0;

    questionCount = () => 10;
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
    outcomes = () => {};
    assessmentViewed = () => {};

    props = {
      settings,
      assessment,
      progress,
      currentQuestion,
      questionCount:questionCount(),
      allQuestions:allQuestions(),
      outcomes:outcomes(),
      assessmentViewed,
      sendSize: () => {},
      scrollParentToTop: () => {},
      hideLMSNavigation: () => {},
    };

    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    jasmine.Ajax.uninstall();
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

  it("renders submit button on last question", () => {
    props.currentQuestion = 9;
    debugger;
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);
    debugger;
    expect(subject.textContent).toContain("Submit");
  });

  it("disables next button on last question", () => {
    props.currentQuestion = 9;
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);

    expect(subject.innerHTML).toContain('<button class="next-btn" disabled="">');
    expect(subject.innerHTML).not.toContain('<button class="prev-btn" disabled="">');
  });

  it("disables previous button on first question", () => {
    expect(subject.innerHTML).toContain('<button class="prev-btn" disabled="">');
    expect(subject.innerHTML).not.toContain('<button class="next-btn" disabled="">');
  });

});
