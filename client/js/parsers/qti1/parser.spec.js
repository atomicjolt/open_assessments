import Parser                from './parser';
import { readFixture }       from '../../../specs_support/utils';
import Immutable             from 'immutable';
import $                     from 'jquery';
import { AssessmentFormats, parse } from '../assessment';

describe('QTI1 assessment parser', () => {
  describe('parse', () => {

    it('parses "MIT" assessment xml from QTI into an object', () => {
      const data          = readFixture("qti1/assessment.xml");
      const xml           = $($.parseXML(data));
      const assessmentXml = xml.find('assessment').addBack('assessment');
      const settings = Immutable.fromJS({
        assessmentId:1
      });
      const assessment    = parse(settings, data);

      expect(assessment).toBeDefined();
      expect(assessment.id).toEqual("ib8d9c142765b2287684aad0b5387e45b");
      expect(assessment.title).toEqual("MIT Questions 1");
      expect(assessment.standard).toEqual(AssessmentFormats.Qti1);
      expect(assessment.sections.length).toEqual(1);
      expect(assessment.sections[0].items.length).toEqual(10);
      var item = assessment.sections[0].items[0];
      expect(item.assessment_question_identifierref).toEqual("icee9d09b0a2ace374f01019034d68155");
      expect(item.id).toEqual("i3590da31ca486c260f96e955482aca41");
      expect(item.title).toEqual("Question 1");
    });

    it('parses the "Financial Markets and System" assessment xml from QTI into an assessment object', () => {
      var data          = readFixture("qti1/text.xml");
      var xml           = $(data);
      var assessmentXml = xml.find('assessment').addBack('assessment');
      var assessment = Parser.parse(1, assessmentXml, xml);

      expect(assessment).toBeDefined();
      expect(assessment.id).toEqual("i0886cfce85384de6a5b5394edca8282f_summative");
      expect(assessment.title).toEqual("Financial Markets and System");
      expect(assessment.standard).toEqual(AssessmentFormats.Qti1);
      expect(assessment.sections.length).toEqual(7);
      expect(assessment.sections[0].items.length).toEqual(0);
      expect(assessment.sections[1].items.length).toEqual(7);
      expect(assessment.sections[2].items.length).toEqual(6);
      expect(assessment.sections[3].items.length).toEqual(5);
      expect(assessment.sections[4].items.length).toEqual(4);
      expect(assessment.sections[5].items.length).toEqual(17);
      expect(assessment.sections[6].items.length).toEqual(5);

      var item = assessment.sections[1].items[0];
      expect(item.id).toEqual("3567");
    });

  });

  describe('parseSections', () => {

    it('find sections in the given qti', () => {
      var data = readFixture("qti1/cells.xml");
      var sections = Parser.parseSections($(data));
      expect(sections.length).toEqual(1);
      var section = sections[0];
      expect(section.id).toEqual("root_section");
      expect(section.standard).toEqual(AssessmentFormats.Qti1);
      expect(section.items.length).toEqual(3);
    });

  });


});
