import Qti           from './qti';
import $             from 'jquery';

describe('Qti', () => {

  var settings;

  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
  });

  describe('parseSections', () => {

    it('find sections in the given qti', () => {
      var data = readFixtures("qti1/cells.xml");
      var sections = Qti.parseSections($(data));
      expect(sections.length).toEqual(1);
      var section = sections[0];
      expect(section.id).toEqual("root_section");
      expect(section.standard).toEqual("qti");
      expect(section.items.length).toEqual(3);
    });

  });

});
