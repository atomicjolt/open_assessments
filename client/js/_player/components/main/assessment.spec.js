import React                   from 'react';
import TestUtils               from 'react-addons-test-utils';
import ReactDOM                from 'react-dom';
import { Provider }            from 'react-redux';

import appHistory              from '../../history';
import localizeStrings         from '../../selectors/localize';
import configureStore          from '../../store/configure_store';
import { SECONDARY_ACTION, PRIMARY_ACTION } from '../assessments/two_button_nav';
import { Assessment }          from './assessment';

var props;
var allQuestions,
  assessment,
  assessmentProgress,
  assessmentViewed,
  currentItem,
  localizedStrings,
  previousQuestions,
  questionCount,
  questionResults,
  questionsPerPage,
  responses,
  settings,
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

  assessmentProgress = {
    currentItemIndex: 0
  };

  localizedStrings = localizeStrings({settings:{locale:"en"}});

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
    assessmentLoaded: true,
    questionResults,
    currentItem,
    hideLMSNavigation: () => {},
    localizedStrings,
    nextQuestions: () => {},
    previousQuestions: () => {},
    primaryActionState: PRIMARY_ACTION.NEXT,
    assessmentProgress,
    questionCount,
    questionsPerPage,
    responses,
    scrollParentToTop: () => {},
    secondaryActionState: {buttonState: SECONDARY_ACTION.PREV},
    sendSize: () => {},
    settings,
    submitAssessment: () => {},
    application: {},
    videoPlay: () => {},
    videoPause: () => {},
    audioPlay: () => {},
    audioPause: () => {},
    audioRecordStart: () => {},
    audioRecordStop: () => {},
  };

  result = TestUtils.renderIntoDocument(
    <Provider store={configureStore({settings})}>
      <Assessment {...props} />
    </Provider>
  );
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
  });

  it("renders the assessment", () => {
    expect(subject).toBeDefined();
  });

  it("renders a question", () => {
    expect(subject.innerHTML).toContain("Test Material");
  });

  it("redirects to assessment result when assessment has been submitted", () => {
    spyOn(appHistory, "push");
    props.assessmentProgress.assessmentResult = "done";
    result = TestUtils.renderIntoDocument(
      <Provider store={configureStore({settings})}>
        <Assessment {...props} />
      </Provider>
    );
    subject = ReactDOM.findDOMNode(result);

    expect(appHistory.push).toHaveBeenCalledWith("assessment-result");
  });
});
