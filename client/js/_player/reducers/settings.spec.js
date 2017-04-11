import settings, { getInitialSettings } from './settings';

describe('settings reducer', () => {
  describe('initial state', () => {
    it('returns empty state', () => {
      const initialState = {};
      const state = settings(initialState, {});
      expect(state).toEqual({});
    });
  });

  describe('getInitialSettings', () => {
    it('Returns the state provided by the server', () => {
      const serverSettings = { foo: 1 };
      const newSettings = getInitialSettings(serverSettings);
      expect(newSettings).toEqual(serverSettings);
    });

    it('Returns combined state', () => {
      const serverSettings1 = { foo: 1 };
      const serverSettings2 = { bar: 2 };
      const newSettings = getInitialSettings(serverSettings1, serverSettings2);
      expect(newSettings.foo).toEqual(1);
      expect(newSettings.bar).toEqual(2);
    });

    it("Parses integer fields to ints", () => {
      const serverSettings = { questions_per_page: "1" };
      const settings = getInitialSettings(serverSettings);
      expect(settings.questions_per_page).toEqual(1);
    });

    it("Maintains the server setting for api_url", () => {
      const serverSettings1 = { api_url: "localhost" };
      const serverSettings2 = { api_url: "www.example.com" };
      const settings = getInitialSettings(serverSettings1, serverSettings2);
      expect(settings.api_url).toEqual("localhost");
    });

    it("Uses query params for api_url if server settings is empty string", () => {
      const serverSettings1 = { api_url: "" };
      const serverSettings2 = { api_url: "www.example.com" };
      const settings = getInitialSettings(serverSettings1, serverSettings2);
      expect(settings.api_url).toEqual("www.example.com");
    });

    it("Uses query params for api_url if server settings is null", () => {
      const serverSettings1 = { api_url: null };
      const serverSettings2 = { api_url: "www.example.com" };
      const settings = getInitialSettings(serverSettings1, serverSettings2);
      expect(settings.api_url).toEqual("www.example.com");
    });

    it("Uses query params for api_url if server settings is not present", () => {
      const serverSettings1 = { foo: "bar" };
      const serverSettings2 = { api_url: "www.example.com" };
      const settings = getInitialSettings(serverSettings1, serverSettings2);
      expect(settings.api_url).toEqual("www.example.com");
    });
  });
});
