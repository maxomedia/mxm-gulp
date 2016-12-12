var gulp        = require('gulp');
var webpack     = require('webpack');
var browserSync = require('./browser-sync').server;
var options     = require('../options').webpack;
var gutil       = require('gulp-util');

// Set shared options
options.plugins = options.plugins || [];
options.output.filename = options.output.filename || '[name].js';
options.bail = true;
options.devtool = 'source-map';

/**
 * Start webpack and log errors to the console and with the error handler.
 * If there is an error, do not reload with browsersync.
 * @param  {Object}   options  Options for webpack
 * @param  {Function} callback Callback for gulp
 */
function pack (callback) {
	if (!options) return;

	// Common chunks
	if (options.commonChunks) {
		options.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: 'shared',
			filename: '[name].js'
		}));
	}

	// Production or not?
	if (process.argv.indexOf('--production') > -1) {

		// Minify
		options.plugins.push(new webpack.optimize.UglifyJsPlugin());
	} else {
		webpack.debug = true;
	}

	webpack(options, function (err, stats) {

		if (err) {

			// Log errors
			gutil.log(gutil.colors.red(err.message));
		} else {

			// Reload page
			browserSync.reload();
		}

		// Finished, with or without errors
		callback();
	});
}

// Export tasks
module.exports = pack;