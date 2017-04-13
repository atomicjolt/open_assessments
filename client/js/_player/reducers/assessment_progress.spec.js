import Immutable                            from 'immutable';

import { Constants as AssessmentConstants } from '../actions/assessment_progress';
import assessmentProgress                   from './assessment_progress';

describe('assessment reducer', () => {

  const settings = Immutable.fromJS({});
  var initialState;
  var parsedAssessment;


  describe("initial reducer state", () => {
    it("returns empty state", () => {
      const state = assessmentProgress(initialState, {});
      expect(state.toJS()).toEqual({
        isSubmitted: false,
        isStarted: false,
        currentItemIndex: 0,
        numQuestionsChecking: 0,
        selectedAnswerId: '',
        checkedResponses:[],
        responses: [],
        startedAt: 0,
        finishedAt: 0,
        assessmentResult:null
      });
    });
  });


  describe("next question", () => {
    const action = {
      type: AssessmentConstants.ASSESSMENT_NEXT_QUESTIONS,
      pageSize:3
    };

    it("increments currentItemIndex", () => {
      var state = assessmentProgress(undefined, action);
      expect(state.get('currentItemIndex')).toEqual(3);
    });
  });

  describe("previous question", () => {
    const action = {
      type: AssessmentConstants.ASSESSMENT_PREVIOUS_QUESTIONS,
      pageSize:2
    };
    let initialState = Immutable.fromJS({currentItemIndex: 5});

    it("decrements currentItemIndex", () => {
      const state = assessmentProgress(initialState, action);
      expect(state.get('currentItemIndex')).toEqual(3);
    });
  });


  describe("assessment viewed", () => {
    const action = {
      type: AssessmentConstants.ASSESSMENT_VIEWED,
    };

    it("sets started at time", () => {
      const state = assessmentProgress(undefined, action);
      expect(state.get('startedAt')).not.toEqual(0);
    });
  });

  describe("answer selected", () => {
    const action = {
      type: AssessmentConstants.ANSWER_SELECTED,
      questionIndex:0,
      answerData:1,
      exclusive:false
    };

    it('adds answerData to responses[][]', () => {
      const state = assessmentProgress(undefined, action);
      expect(state.getIn(['responses', '0']).toJS()).toEqual([1]);
    });

    it("appends to array if items already exist and exclusive flag is false", () => {
      var initialState = Immutable.fromJS({responses:[[2]]});
      const state = assessmentProgress(initialState, action);
      expect(state.getIn(['responses', '0']).toJS()).toEqual([2,1]);
    });

    it("replaces responses if exclusive answer flag is true", () => {
      let action = {
        type: AssessmentConstants.ANSWER_SELECTED,
        questionIndex:0,
        answerData:1,
        exclusive:true
      };
      var initialState = Immutable.fromJS({responses:[[2]]});
      const state = assessmentProgress(initialState, action);
      expect(state.getIn(['responses', '0']).toJS()).toEqual([1]);
    });

  });

  describe("check answer done", () => {
    const action = {
      type: AssessmentConstants.ASSESSMENT_CHECK_ANSWER_DONE,
      payload:{correct:true, feedback:"You win!"},
      userInput:['a'],
      questionIndex:3
    };
    it("it returns feedback", () => {
      var initialState = Immutable.fromJS({checkedResponses:[]});
      const state = assessmentProgress(initialState, action);
      expect(state.getIn(['checkedResponses', '3']).toJS()).toEqual(
        {a:{correct:true, feedback:"You win!"}}
      );
    });

    it("decrements numQuestionsChecking", () => {
      var initialState = Immutable.fromJS({numQuestionsChecking:1});
      const state = assessmentProgress(initialState, action);
      expect(state.get('numQuestionsChecking')).toEqual(0);
    });
  });

  describe("check questions", () => {
    it('checks adds number of questions to numQuestionsChecking', () => {
      const action = {
        type: AssessmentConstants.CHECK_QUESTIONS,
        numQuestions: 1
      };
      var initialState = Immutable.fromJS({numQuestionsChecking:0});
      const state = assessmentProgress(initialState, action);
      expect(state.get('numQuestionsChecking')).toEqual(1);
    });
  });

});
