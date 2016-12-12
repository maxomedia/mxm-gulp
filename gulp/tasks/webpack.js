var gulp        = require('gulp');
var webpack     = require('webpack');
var browserSync = require('./browser-sync').server;
var options     = require('../options').webpack;
var gutil       = require('gulp-util');

// Set shared options
options.plugins = options.plugins || [];
options.output.filename = options.output.filename || '[name].js';
options.bail = true;

/**
 * Dev build. Non minified but with sourcemaps
 * @param  {Function} callback Gulp callback
 */
function dev (callback) {
	if (!options) return;

	// Common chunks
	if (options.commonChunks) {
		options.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: 'shared',
			filename: '[name].js'
		}));
	}

	// Enable debug mode and sourcemaps
	webpack.debug = true;
	options.devtool = 'source-map';
	pack(options, callback);
}

/**
 * Stage build with minification and source maps
 * @param  {Function} callback Gulp callback
 */
function stage (callback) {
	if (!options) return;

	// Common chunks
	if (options.commonChunks) {
		options.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: 'shared',
			filename: '[name].js'
		}));
	}

	// Sourcemaps
	options.devtool = 'source-map';

	// Minify
	options.plugins.push(new webpack.optimize.UglifyJsPlugin())

	pack(options, callback);
}

/**
 * Start webpack and log errors to the console and with the error handler.
 * If there is an error, do not reload with browsersync.
 * @param  {Object}   options  Options for webpack
 * @param  {Function} callback Callback for gulp
 */
function pack (options, callback) {	
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

// Register tasks
gulp.task('webpack', dev);
gulp.task('webpack:dev', function () {
	gulp.watch(options.src, ['webpack'])
});
gulp.task('webpack:stage', stage);

// Export tasks
module.exports = dev;