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
      //debugger;
      const data        = readFixtures("qti2/choice.xml");
      const xml         = $($.parseXML(data));
      const settings    = Immutable.fromJS({ assessmentId: 1 });
      const assessment  = parse(settings, data);

      expect(assessment).toBeDefined();
      expect(assessment.id).toEqual("ib8d9c142765b2287684aad0b5387e45b");
      expect(assessment.title).toEqual("MIT Questions 1");
      expect(assessment.standard).toEqual(AssessmentFormats.Qti2);
      expect(assessment.sections.length).toEqual(1);
      expect(assessment.sections[0].items.length).toEqual(10);
      var item = assessment.sections[0].items[0];
      expect(item.assessment_question_identifierref).toEqual("icee9d09b0a2ace374f01019034d68155");
      expect(item.id).toEqual("i3590da31ca486c260f96e955482aca41");
      expect(item.title).toEqual("Question 1");
    });

  });

  // describe("parseSections", () => {

  //   it("find sections in the given qti", () => {
  //     var data = readFixtures("qti2/cells.xml");
  //     var sections = Parser.parseSections($(data));
  //     expect(sections.length).toEqual(1);
  //     var section = sections[0];
  //     expect(section.id).toEqual("root_section");
  //     expect(section.standard).toEqual(AssessmentFormats.Qti2);
  //     expect(section.items.length).toEqual(3);
  //   });

  // })
  ;


});
