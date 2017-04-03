import Immutable  from 'immutable';

import { readFixture }              from '../../../specs_support/utils';
import { parse } from '../assessment';
import { transformItem }            from './qti';


describe('QTI 2 Functions', () => {

  describe("transformItem", () => {
    it("sets isHtml to true", () => {
      const data = readFixture('qti2/choice.xml');
      const settings = Immutable.fromJS({ assessmentId: 1 });
      const assessment = parse(settings, data);
      const props = transformItem(assessment.item.xml);

      expect(props.isHtml).toEqual(true);
    });
  });
});
