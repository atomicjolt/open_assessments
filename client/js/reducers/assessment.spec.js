import Immutable                            from "immutable";
import { Constants as AssessmentConstants } from "../actions/assessment";
import { parse }                            from '../parsers/assessment';
import assessment                           from "./assessment";

describe('assessment reducer', () => {

  var initialState;
  var parsedAssessment;
  var data;

  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
    data = readFixtures("qti1/assessment.xml");
    parsedAssessment = parse(data);
  });

  describe("initial reducer state", () => {
    it("returns empty state", () => {
      const state = assessment(initialState, {});
      expect(state).toEqual(null);
    });
  });

  describe("assessment loaded", () => {
    it("sets the state to the loaded assessment", () => {
      const action = {
        type: AssessmentConstants.LOAD_ASSESSMENT_DONE,
        payload: {
          assessment: parsedAssessment
        }
      };
      const state = assessment(initialState, action);
      expect(state).toEqual(parsedAssessment);
    });
  });

});
