// Karma configuration
// Generated on Fri Feb 17 2017 09:50:54 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },


    // list of files / patterns to load in the browser
    files: [
      'src/tests/example.js'
    ],

    plugins: [
      // Karma will require() these plugins
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter')
    ],


    exclude: [],
    preprocessors: {},
    reporters: ['progress', 'kjhtml'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS'],
    singleRun: false
  })
}
