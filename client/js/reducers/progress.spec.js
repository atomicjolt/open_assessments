import Immutable                            from "immutable";

import { Constants as AssessmentConstants } from "../actions/assessment_progress";
import { parse }                            from '../parsers/assessment';
import progress                             from "./progress";

describe('assessment reducer', () => {

  const settings = Immutable.fromJS({});
  var initialState;
  var parsedAssessment;


  describe("initial reducer state", () => {
    it("returns empty state", () => {
      const state = progress(initialState, {});
      expect(state.toJS()).toEqual({
        isSubmitted: false,
        isStarted: false,
        currentItemIndex: 0,
        selectedAnswerId: '',
        answerMessageIndex: [],
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
      var state = progress(undefined, action);
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
      const state = progress(initialState, action);
      expect(state.get('currentItemIndex')).toEqual(3);
    });
  });


  describe("assessment viewed", () => {
    const action = {
      type: AssessmentConstants.ASSESSMENT_VIEWED,
    };

    it("sets started at time", () => {
      const state = progress(undefined, action);
      expect(state.get('startedAt')).not.toEqual(0);
    });
  });

  describe("answer selected", () => {
    const action = {
      type: AssessmentConstants.ANSWER_SELECTED,
      questionIndex:0,
      answerId:1
    };

    it("adds answerId to responses[][]", () => {
      const state = progress(undefined, action);
      expect(state.getIn(['responses', '0']).toJS()).toEqual([1]);
    });

    it("appends to array if items already exist", () => {
      var initialState = Immutable.fromJS({responses:[[2]]});
      const state = progress(initialState, action);
      expect(state.getIn(['responses', '0']).toJS()).toEqual([2,1]);
    });

  });

});
