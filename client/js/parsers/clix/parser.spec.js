import Immutable  from "immutable";
import $          from "jquery";

import { AssessmentFormats, parse }  from "../assessment";
import Parser                        from "./parser";
import { parseFeedback }             from "./parser";
import { readFixture }               from '../../../specs_support/utils';

describe("CLIx assessment parser", () => {
  describe("parse", () => {

    it("parses example assessment JSON from CLIx into an object", () => {
      const data        = readFixture("clix/assessment.json");
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

  describe("parse feedback", () => {
    var feedback = "<?xml version='1.0' encoding='utf-8'?><modalFeedback identifier='assessment.Answer%3A577eab12b3fcec48316ad493%40ODL.MIT.EDU' outcomeIdentifier='FEEDBACKMODAL' showHide='show'><p>Well done!</p></modalFeedback>";
    it('parses feedback content', () => {
      var result = parseFeedback(feedback);

      expect(result).toEqual("<p>Well done!</p>");
    });

    it('handles no feedback available', () => {
      var result = parseFeedback("No feedback available.");

      expect(result).toEqual('');
    });

    it('handles bad xml', () => {
      spyOn(console, 'error')
      var result = parseFeedback('<notxml>reallyNotXml');

      expect(console.error).toHaveBeenCalled();
    });
  });
});
