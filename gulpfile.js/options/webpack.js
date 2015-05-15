var _           = require('lodash');
var webpack     = require('webpack');
var fastOptions = require('../options');

// Define extended default options, they
// can be overriden by the fast options
var defaults = {
	output: {
		path: fastOptions.dest + '/js/',
		filename: '[name].js',
		publicPath: fastOptions.webroot
	},
	devtool: '#source-map',
	resolve: {
		extensions: ['', '.js']
	},
	debug: true
}

// Add plugins
if (!defaults.plugins) defaults.plugins = [];
defaults.plugins.push(new webpack.optimize.CommonsChunkPlugin({
	name: 'shared',
	filename: '[name].js'
}));

// Export extended options
module.exports = _.extend({}, defaults, fastOptions.webpack);