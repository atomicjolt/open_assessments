import $                                    from "jquery";
import Immutable                            from "immutable";

import { Constants as AssessmentConstants } from "../actions/assessment";
import { parse }                            from '../parsers/assessment';
import assessment                           from "./assessment";

describe('assessment reducer', () => {

  const settings = Immutable.fromJS({});
  var initialState;
  var parsedAssessment;

  beforeAll(() => {
    const settings = Immutable.fromJS({assessmentId:1});
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
    const data = readFixtures("qti1/assessment.xml");
    parsedAssessment = parse(settings, data);
  });

  describe("initial reducer state", () => {
    it("returns empty state", () => {
      const state = assessment(initialState, {});
      expect(state.toJS()).toEqual({});
    });
  });

  describe("assessment loaded", () => {
    it("sets the state to the loaded assessment", () => {
      const action = {
        type: AssessmentConstants.LOAD_ASSESSMENT_DONE,
        payload: parsedAssessment
      };
      const state = assessment(initialState, action);
      expect(state.toJS()).toEqual(parsedAssessment);
    });
  });

});
