var _           = require('lodash');
var webpack     = require('webpack');
var fastOptions = require('../options');
var path        = require('path');

module.exports = function (env) {

	var defaults = _.extend({}, fastOptions.webpack);

	// General options
	defaults.plugins = defaults.plugins || [];

	// Set resolve extensions and paths
	defaults.resolve = defaults.resolve || {
		extensions: ['', '.js'],
		root: path.resolve('./src/js')
	};

	// Set options that do not apply to karma,
	// so for 'dev' and 'stage'
	if (env !== 'test') {

		// Chunk up the resulting scripts
		defaults.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: 'shared',
			filename: '[name].js'
		}));

		// Set output dirs
		defaults.output = defaults.output || {
			path: fastOptions.dest + '/js/',
			filename: '[name].js',
			publicPath: fastOptions.webroot
		}
	}

	// Set dev options
	if (env === 'dev') {
		defaults.debug = true;
	}

	// Set stage options
	if (env === 'stage') {
		defaults.debug = false;
		defaults.plugins.push(new webpack.optimize.UglifyJsPlugin())
	}

	return defaults;
};