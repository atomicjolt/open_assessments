import Qti2Parser                              from './parser';
import { getItems, loadOutcomes, checkAnswer } from './qti';
import $                                       from 'jquery';

describe('QTI 2 Functions', () => {

  var settings;

  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
    settings = {};
  });

});
