import Immutable  from "immutable";
import $          from "jquery";

import { AssessmentFormats, parse }  from "../assessment";
import Parser                        from "./parser";

describe("CLIx assessment parser", () => {

  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
  });

  describe("parse", () => {

    it("parses example assessment JSON from CLIx into an object", () => {
      const data        = readFixtures("clix/assessment.json");
      const settings    = {assessment_id: 1};
      const assessment  = parse(settings, data);

      expect(assessment).toBeDefined();
      expect(assessment.id).toEqual(1);
      expect(assessment.title).toBeUndefined();
      expect(assessment.standard).toEqual(AssessmentFormats.CLIx);
      expect(assessment.items.length).toEqual(3);
      expect(assessment.items[0].title).toEqual("Question 2");
      expect(assessment.items[1].title).toEqual("Question 3");
      expect(assessment.items[2].title).toEqual("Social Introductions Role Play");
    });

  });
});
