// superagent-mock file for qbank calls
// From: https://github.com/M6Web/superagent-mock
module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: 'https://www.example.com(.*)',
    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get(match, data) {
      return {
        body: data
      };
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post(match, data) {
      return {
        code: 200,
        body: data
      };
    }
  },
];
