var karmaWebpack = require('karma-webpack')
var webpackConfig = require('./webpack')('test');
var options = require('../options').webpack;

// Define test source folder
var src = options.src + '/**/__tests__/*';

// Set up config
var config = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [src],
  preprocessors: {},
  webpack: webpackConfig,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
};

// Set preprocessor with variable key in associative array
config.preprocessors[src] = ['webpack'];

// Export the config
module.exports = config;