import Assessment         from './parser';
// import * as AssessmentActions  from "../../actions/assessment";
import $                  from 'jquery';
import Helper             from '../../../specs_support/helper';
import nock               from 'nock';

describe('edX assessment parser', () => {
  const jwt = 'jwt_token';
  const csrf = 'csrf_value';
  const params = {};
  const apiUrl = 'http://www.example.com';
  const headers = {};
  const sequential = {
    children: () => {},
    attr: () => {},
  };
  let expectedHeaders;
  let settings;

  beforeAll(() => {
    settings = {};
  });

  describe('parseEdX', () => {

    beforeEach(() => {
      expectedHeaders = {
        Accept: 'application/xml',
      };
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('parses assessment xml from EdX into an object', () => {});
  });

  //TODO add edx specs
  describe('CheckAnswer edx_drag_and_drop', () => {});

  describe('CheckAnswer edx_numerical_input', () => {});

  describe('CheckAnswer edx_multiple_choice', () => {});
});
