import Immutable                            from "immutable";
import { Constants as JwtConstants }        from "../actions/jwt";
import { Constants as AssessmentConstants } from "../actions/assessment";
import parseAssessment                      from '../parsers/assessment';
import assessment                           from "./assessment";
import { questionCount }                    from "./assessment";

describe('assessment reducer', () => {
  var initialState;

  describe("initial reducer state", () => {
    it("returns empty state", () => {
      const state = assessment(initialState, {});
      expect(state).toEqual(null);
    });
  });

  describe("initial state for qti 1", () => {

    beforeAll(() => {
      jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
      var data = readFixtures("qti1/assessment.xml");
      initialState = parseAssessment(data);
    });

    // it("", () => {
    //   const newState = assessment(state, {
    //     type: JwtConstants.REFRESH_JWT,
    //     payload: newJwt
    //   });

    //   expect(newState.toJS().jwt).toEqual(newJwt);
    // });

    describe("questionCount", () => {
      const state = assessment(initialState, {});
      const count = questionCount(state);
      expect(count).toEqual();
    });

  });

});
