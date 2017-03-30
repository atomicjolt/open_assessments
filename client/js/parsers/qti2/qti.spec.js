import $          from "jquery";
import Immutable  from "immutable";
import fs         from 'fs';

import { AssessmentFormats, parse }             from "../assessment";
import Parser                                   from "./parser";
import Qti2Parser                               from "./parser";
import { transformItem }                        from "./qti";


describe('QTI 2 Functions', () => {

  describe("transformItem", () => {
    it("sets isHtml to true", () => {
      debugger;
      const data = fs.readFile("./specs_support/fixtures/qti2/choice.xml");
      const settings = Immutable.fromJS({ assessmentId: 1 });
      const assessment = parse(settings, data);
      const props = transformItem(assessment.item.xml);

      expect(props.isHtml).toEqual(true);
    });
  });
});
