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

    it('parses assessment xml from EdX into an object', () => {
      settings = {
        srcUrl: "edXCourse/sequential/97cc2d1812204294b5fcbb91a1157368.xml"
      };
      const url = '/edXCourse/sequential/97cc2d1812204294b5fcbb91a1157368';
      expectedHeaders.Authorization = `Bearer ${jwt}`;
      expectedHeaders['X-CSRF-Token'] = csrf;
      const nockRequest = Helper.mockRequest('get', apiUrl, url, expectedHeaders);

      Assessment.parseEdx().get(url, apiUrl, jwt, csrf, params, headers).then((result) => {
        expect(result.statusCode).toBe(200);
        expect(result.text).toEqual(Helper.testPayload());
      });
      expect(nockRequest.isDone()).toBeTruthy();
    });
  });

  //TODO add edx specs
  describe('CheckAnswer edx_drag_and_drop', () => {});

  describe('CheckAnswer edx_numerical_input', () => {});

  describe('CheckAnswer edx_multiple_choice', () => {});
});
