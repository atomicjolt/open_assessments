import Assessment         from './parser';
// import * as AssessmentActions  from "../../actions/assessment";
import $                  from 'jquery';
import { readFixture }    from '../../../specs_support/utils';

xdescribe('edX assessment parser', () => {

  var settings;
  var sequential;
  var vertical;
  var problem1;
  var problem2;
  var problem3;
  var problem4;
  var problem5;
  var problem6;
  var problem7;

  beforeAll(() => {
    settings = {};

    sequential = readFixture("edXCourse/sequential/97cc2d1812204294b5fcbb91a1157368.xml");
    vertical = readFixture("edXCourse/vertical/04735103fe064c9da3a1a758bcda2692.xml");
    problem1 = readFixture('edXCourse/problem/1bdd2690346d437eacc85567ed79702f.xml');
    problem2 = readFixture('edXCourse/problem/d0ef2adedeba45038d69b24517892d1d.xml');
    problem3 = readFixture('edXCourse/problem/78934fbb26f44b2b85d252a4f3c52d54.xml');
    problem4 = readFixture('edXCourse/problem/d649f04c5979438fbe82334f07b7d6fe.xml');
    problem5 = readFixture('edXCourse/problem/8d6900d170f34deeb718866c2954c75f.xml');
    problem6 = readFixture('edXCourse/problem/da63a43c68024407aab8ca0f7c790b12.xml');
    problem7 = readFixture('edXCourse/problem/c34a20e2f1e24890baffcfc9ac68dcfc.xml');
  });

  describe('parseEdX', () => {

    beforeEach(() => {
      jasmine.Ajax.install();

      // Stub request to load problems
      jasmine.Ajax.stubRequest('edXCourse/problem/1bdd2690346d437eacc85567ed79702f.xml').andReturn({
        "status": 200,
        "contentType": "application/xml",
        "statusText": "OK",
        "responseText": problem1
      });

      jasmine.Ajax.stubRequest('edXCourse/problem/d0ef2adedeba45038d69b24517892d1d.xml').andReturn({
        "status": 200,
        "contentType": "application/xml",
        "statusText": "OK",
        "responseText": problem2
      });

      jasmine.Ajax.stubRequest('edXCourse/problem/78934fbb26f44b2b85d252a4f3c52d54.xml').andReturn({
        "status": 200,
        "contentType": "application/xml",
        "statusText": "OK",
        "responseText": problem3
      });

      jasmine.Ajax.stubRequest('edXCourse/problem/d649f04c5979438fbe82334f07b7d6fe.xml').andReturn({
        "status": 200,
        "contentType": "application/xml",
        "statusText": "OK",
        "responseText": problem4
      });

      jasmine.Ajax.stubRequest('edXCourse/problem/8d6900d170f34deeb718866c2954c75f.xml').andReturn({
        "status": 200,
        "contentType": "application/xml",
        "statusText": "OK",
        "responseText": problem5
      });

      jasmine.Ajax.stubRequest('edXCourse/problem/da63a43c68024407aab8ca0f7c790b12.xml').andReturn({
        "status": 200,
        "contentType": "application/xml",
        "statusText": "OK",
        "responseText": problem6
      });

      jasmine.Ajax.stubRequest('edXCourse/problem/c34a20e2f1e24890baffcfc9ac68dcfc.xml').andReturn({
        "status": 200,
        "contentType": "application/xml",
        "statusText": "OK",
        "responseText": problem7
      });

      spyOn(AssessmentActions, 'edXLoadItem');

    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    it('parses assessment xml from EdX into an object', () => {
      settings = {
        srcUrl: "edXCourse/sequential/97cc2d1812204294b5fcbb91a1157368.xml"
      };

      var assessment = Assessment.parseEdX(settings, $(sequential));

      expect(assessment).toBeDefined();
      expect(assessment.id).toEqual("sequential/97cc2d1812204294b5fcbb91a1157368");
      expect(assessment.title).toEqual("Subsection One");
      expect(assessment.standard).toEqual("edX");
      expect(assessment.sections.length).toEqual(1);
      expect(assessment.sections[0]).toEqual("04735103fe064c9da3a1a758bcda2692");

      expect(jasmine.Ajax.requests.mostRecent().url).toBe('edXCourse/vertical/04735103fe064c9da3a1a758bcda2692.xml');
      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": "application/xml",
        "statusText": "OK",
        "responseText": vertical
      });

      expect(AssessmentActions.edXLoadItem).toHaveBeenCalled();

    });
  });

  //TODO add edx specs
  describe('CheckAnswer edx_drag_and_drop', () => {});

  describe('CheckAnswer edx_numerical_input', () => {});

  describe('CheckAnswer edx_multiple_choice', () => {});
});
