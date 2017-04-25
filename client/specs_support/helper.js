import _                  from 'lodash';
import configureStore     from '../js/_player/store/configure_store';
import nock               from 'nock';

export default class Helper {

  // Create a fake store for testing
  static mockStore(state) {
    return {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({ ...state })
    };
  }

  // Create a real store that can be used for testing
  static makeStore(settings) {
    const initialState = {
      jwt: 'fake_jwt_token',
      settings: _.assign({
        csrf: 'csrf_token',
        api_url: 'http://www.example.com'
      }, settings)
    };
    return configureStore(initialState);
  }

  static testPayload() {
    return JSON.stringify([{
      id: 1,
      name: 'Starter App'
    }]);
  }

  static mockRequest(method, apiUrl, url, expectedHeaders) {
    return nock(apiUrl, expectedHeaders)
    .intercept(url, method)
    .reply(
      200,
      Helper.testPayload(),
      { 'content-type': 'application/json' }
    );
  }

  static mockAllAjax() {
    beforeEach(() => {
      nock('http://www.example.com')
        .persist()
        .get(RegExp('.*'))
        .reply(200, Helper.testPayload(), { 'content-type': 'application/json' });
      nock('http://www.example.com')
        .persist()
        .post(RegExp('.*'))
        .reply(200, Helper.testPayload(), { 'content-type': 'application/json' });
      nock('http://www.example.com')
        .persist()
        .put(RegExp('.*'))
        .reply(200, Helper.testPayload(), { 'content-type': 'application/json' });
      nock('http://www.example.com')
        .persist()
        .delete(RegExp('.*'))
        .reply(200, Helper.testPayload(), { 'content-type': 'application/json' });
    });

    afterEach(() => {
      nock.cleanAll();
    });
  }

  static mockClock() {
    beforeEach(() => {
      jasmine.clock().install(); // Mock out the built in timers
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });
  }

}
