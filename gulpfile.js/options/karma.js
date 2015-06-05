var karmaWebpack = require('karma-webpack')
var webpackConfig = require('./webpack')('test');
var options = require('../options').webpack;

// Export options for the karma test
module.exports = {
  frameworks: ['mocha', 'sinon-chai'],

  // Grab all the test files
  files: [
    options.src + '/**/__tests__/*'
  ],

  // Run js files through webpack, so require
  // statements get resolved
  preprocessors: {
    options.src + '/**/__tests__/*': ['webpack']
  },

  webpack: webpackConfig,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
};