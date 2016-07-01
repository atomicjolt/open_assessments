import Immutable  from "immutable";
import $          from "jquery";

import { AssessmentFormats, parse }  from "../assessment";
import Parser                        from "./parser";

describe("QTI2 assessment parser", () => {

  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
  });

  describe("parse", () => {

    it("parses \"choice\" assessment xml from QTI into an object", () => {
      const data        = readFixtures("qti2/choice.xml");
      const xml         = $($.parseXML(data));
      const settings    = {assessment_id: 1};
      const assessment  = parse(settings, data);

      expect(assessment).toBeDefined();
      expect(assessment.id).toEqual(1);
      expect(assessment.item.title).toEqual("Unattended Luggage");
      expect(assessment.title).toEqual("Unattended Luggage");
      expect(assessment.standard).toEqual(AssessmentFormats.Qti2);
    });

  });
});
