// karma config info: http://karma-runner.github.io/0.12/config/configuration-file.html
const webpack       = require('webpack');
const webpackConfig = require('./webpack.config')('test');

module.exports = () => {
  const testConfig = {

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // How long will Karma wait for a message from a browser before disconnecting from it (in ms)
    browserNoActivityTimeout: 60000,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // web server port
    port: 9876,

    files: [
      // fixtures
      { pattern: './specs_support/fixtures/**/*.json', watched: true, served: true, included: false },
      { pattern: './specs_support/fixtures/**/*.xml', watched: true, served: true, included: false },
      { pattern: './specs_support/fixtures/**/stream', watched: false, served: true, included: false },

      // Use webpack to build each test individually. If changed here, change in preprocessors
      // './js/**/*.spec.js'
      './webpack.tests.js',          // More performant but tests cannot be run individually
    ],

    // Transpile tests with the karma-webpack plugin
    preprocessors: {
      // Use webpack to build each test individually. If changed here, match the change in files
      // './js/**/*.spec.js': ['webpack', 'sourcemap']
      './webpack.tests.js': ['webpack', 'sourcemap'],      // More performant but tests cannot be run individually
    },

    // Run the tests using any of the following browsers
    // - Chrome         npm install --save-dev karma-chrome-launcher
    // - ChromeCanary
    // - Firefox        npm install --save-dev karma-firefox-launcher
    // - Opera          npm install --save-dev karma-opera-launcher
    // - Safari         npm install --save-dev karma-safari-launcher  (only Mac)
    // - PhantomJS      npm install --save-dev karma-phantomjs-launcher
    // - IE             npm install karma-ie-launcher (only Windows)
    browsers: ['Chrome'],

    // Exit the test runner as well when the test suite returns.
    singleRun: false,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Use jasmine as the test framework
    frameworks: ['jasmine-ajax', 'jasmine-jquery', 'jasmine'],

    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage', 'spec'
    reporters: ['dots'],

    // karma-webpack configuration. Load and transpile js and jsx files.
    webpack: {
      devtool : 'eval',
      plugins : webpackConfig.plugins,
      module  : webpackConfig.module,
      resolve : webpackConfig.resolve,
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      query: {
        presets: ['airbnb']
      }
    },

    // Reduce the noise to the console
    webpackMiddleware: {
      noInfo : true,
      stats  : {
        colors: true,
      },
    },
  };
  return testConfig;
};
