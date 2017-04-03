import $                                                 from 'jquery';
import Immutable                                         from 'immutable';
import { parse, getAssessmentFormat, AssessmentFormats } from './assessment';
import { readFixture }                                   from '../../specs_support/utils';

const settings = Immutable.fromJS({});

describe('assessment parser', () => {
  // Disabled until this gets refactored back out of parse().
  // describe('getAssessmentFormat', () => {

  //   it('returns "QTI1" for Qti 1.x assessment', () => {
  //     const data = readFixture("qti1/assessment.xml");
  //     const xml    = $($.parseXML(data));
  //     expect(getAssessmentFormat(xml)).toEqual(AssessmentFormats.Qti1);
  //   });

  //   it('returns "QTI2" for Qti 2.x assessment', () => {
  //     // TODO
  //   });

  //   it('returns "EDX" for edX assessment', () => {
  //     // TODO
  //   });

  // });

  describe('parse', () => {

    it('parses assessment xml from QTI 1 into an object', () => {
      var data       = readFixture("qti1/assessment.xml");
      var assessment = parse(settings, data);

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

    it('parses assessment xml from QTI 2 into an object', () => {
      var data       = readFixture("qti2/math_equation.xml");
      var assessment = parse(settings, data);

      expect(assessment).toBeDefined();

    });

  });

});
