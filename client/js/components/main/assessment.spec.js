import React                   from "react";
import ReactDOM                from "react-dom";
import TestUtils               from "react/lib/ReactTestUtils";
import Helper                  from "../../../specs_support/helper";

import appHistory              from "../../history";
import { Assessment }          from "./assessment";
import * as AssessmentActions  from "../../actions/assessment";


var props;
var allQuestions,
  assessment,
  assessmentViewed,
  questionResults,
  currentItem,
  previousQuestions,
  progress,
  questionCount,
  questionsPerPage,
  responses,
  result,
  settings,
  subject,
  submitAssessment;

var result;
var subject;

function reset(){
  allQuestions = [{
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

  questionResults = {};

  currentItem = 5;

  questionsPerPage = 1;

  progress = {
    currentItemIndex:0
  };

  questionCount = 10;

  responses = [];
  settings = {
    user_id            : 0,
    max_attempts       : 1,
    eid                : "external_identifier",
    src_url            : "http://www.openassessments.com/api/assessments/55.xml",
    questions_per_page : 1,
    assessment_kind    : "SUMMATIVE"
  };

  props = {
    allQuestions,
    assessment,
    assessmentViewed: () => {},
    questionResults,
    currentItem,
    hideLMSNavigation: () => {},
    nextQuestions: () => {},
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


  result = TestUtils.renderIntoDocument(<Assessment {...props} />);
  subject = ReactDOM.findDOMNode(result);
};


describe("assessment", function() {


  // Props are reset to these default values between each test. To use
  // a modified prop in your test case, modify props.myProp in your test case and
  // re-render dom element with  result = TestUtils.renderIntoDocument. Then
  // proceed to test your result.
  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    jasmine.Ajax.uninstall();
  });

  it("Calls nextQuestions when the next button is clicked", () => {
    spyOn(props, "nextQuestions");
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    let button = TestUtils.findRenderedDOMComponentWithClass(result, "c-btn--next");
    TestUtils.Simulate.click(button);

    expect(props.nextQuestions).toHaveBeenCalled();
  });

  it("Calls previousQuestions when the previous button is clicked", () => {
    spyOn(props, "previousQuestions");
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    let button = TestUtils.findRenderedDOMComponentWithClass(result, "c-btn--previous");
    TestUtils.Simulate.click(button);

    expect(props.previousQuestions).toHaveBeenCalled();
  });

  it("renders the assessment", () => {
    expect(subject).toBeDefined();
  });

  it("renders a question", () => {
    expect(subject.innerHTML).toContain("Test Material");
  });

  it("redirects to assessment result when assessment has been submitted", () => {
    spyOn(appHistory, "push");
    props.progress.assessmentResult = "done";
    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    subject = ReactDOM.findDOMNode(result);

    expect(appHistory.push).toHaveBeenCalledWith("assessment-result");
  });

  it('isLastPage should return true on last question', () => {
    props.currentItem = 9;

    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    expect(result.isLastPage()).toEqual(true);
  });

  it('isLastPage should not return true otherwise', () =>{
    props.currentItem = 8;

    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    expect(result.isLastPage()).toEqual(false);
  });

  it('isFirstPage should return true on first question', () => {
    props.currentItem = 0;

    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    expect(result.isFirstPage()).toEqual(true);
  });

  it('isFirstPage should not return true otherwise', () =>{
    props.currentItem = 1;

    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
    expect(result.isFirstPage()).toEqual(false);
  });


  describe('getNextUnlocked', () => {
    beforeEach(() => { reset(); });

    describe('when unlockNext is ON_CORRECT', () => {
      var checkedResponse = () => ({correct:true, feedback:"Correct Answer"});
      var unlockNext = "ON_CORRECT";
      var currentItem = 0;
      var questionsPerPage = 10;
      var questionResults = {};
      var responses = [];
      for(var i = 0; i < 10; i++){
        questionResults[i] = checkedResponse();
        responses.push('a');
      }

      it('should return true when all answers in current page are correct', () => {
        var subject = result.getNextUnlocked;

        expect(subject(unlockNext, questionsPerPage, questionResults)).toEqual(true);
      });

      it('should return false when there is an incorrect answer in current page', () => {
        var subject = result.getNextUnlocked;
        var incorrectResponses = {};
        for(var i = 0; i < 10; i++){ incorrectResponses[i] = checkedResponse(); }
        incorrectResponses[9].correct = false;

        expect(subject(unlockNext, questionsPerPage, incorrectResponses)).toEqual(false);
      });

      it('should return false when there is an unanswered question in current page', () => {
        var subject = result.getNextUnlocked;
        var gradedResponses = {};
        for(var i = 0; i < 5; i++){
          gradedResponses[i] = checkedResponse();
        }

        expect(subject(unlockNext, questionsPerPage, gradedResponses)).toEqual(false);
      });
    });

    describe('when unlockNext is ON_ANSWER_CHECK', () => {
      var checkedResponse = () => ({correct:false, feedback:"Correct Answer"});
      var unlockNext = "ON_ANSWER_CHECK";
      var currentItem = 0;
      var questionsPerPage = 10;
      var questionResults = {};
      var responses = [];
      for(var i = 0; i < 10; i++){
        questionResults[i] = checkedResponse();
        responses.push('a');
      }

      it('should return true when all questions have been checked in current page', () => {
        var subject = result.getNextUnlocked;

        expect(subject(unlockNext, questionsPerPage, questionResults)).toEqual(true);
      });

      it('should return false when all questions have not been answered in current page', () => {
        var subject = result.getNextUnlocked;
        var incompleteResponses = {};
        for(var i = 0; i < 5; i++){
          incompleteResponses[i] = checkedResponse();
        }
        expect(subject(unlockNext, questionsPerPage, incompleteResponses)).toEqual(false);
      });
    });

    describe(' when unlockNext is on ALWAYS', () => {
      var checkedResponse = () => ({correct:false, feedback:"Correct Answer"});
      var unlockNext = "ALWAYS";
      var currentItem = 0;
      var questionsPerPage = 10;
      var questionResults = {};
      var responses = [];

      it('should return true if no questions are answered', () => {
        var subject = result.getNextUnlocked;

        expect(subject(unlockNext, questionsPerPage, questionResults)).toEqual(true);

      });
    });
  });

});
