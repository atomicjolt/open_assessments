import $          from "jquery";
import Immutable  from "immutable";

import { AssessmentFormats, parse }             from "../assessment";
import Parser                                   from "./parser";
import Qti2Parser                               from "./parser";
import { transformItem }                        from "./qti";


describe('QTI 2 Functions', () => {

  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
  });

  describe("transformItem", () => {
    it("sets isHtml to true", () => {
      const data = readFixtures("qti2/choice.xml");
      const settings = Immutable.fromJS({ assessmentId: 1 });
      const assessment = parse(settings, data);
      const props = transformItem(assessment.item.xml);

      expect(props.isHtml).toEqual(true);
    });
  });
});
