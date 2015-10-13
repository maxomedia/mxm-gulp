var karmaWebpack = require('karma-webpack')
var options = require('../options').webpack;

// Define test source folder
var src = 'src/js/__tests__/**/*.js';

// Set up config
var config = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [src],
  preprocessors: {},
  webpack: options,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
};

// Set preprocessor with variable key in associative array
config.preprocessors[src] = ['webpack'];

// Export the config
module.exports = config;