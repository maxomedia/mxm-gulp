var gulp        = require('gulp');
var webpack     = require('webpack');
var browserSync = require('browser-sync');
var kickstarter = require('../utils/kickstarter');
var options     = require('../options').webpack;
var gulpWatch   = require('gulp-watch');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var path = require('path');

// Set shared options
options.plugins = options.plugins || [];
options.output.filename = options.output.filename || '[name].js';
options.bail = true;

/**
 * Test build for karma
 * @param  {Function} callback Gulp callback
 */
function test (callback) {
	if (!options) return;

	pack(options, callback);
}

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
 * Use gulp-watch to wait for file changes. gulp-watch is used over
 * webpack.watch for consistency over all tasks.
 */
function watch () {
	if (!options) return;

	gulpWatch(options.src, function () {
		gulp.start('webpack');
	});
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

			// TODO: replace this with generic error logger
			gutil.log(
				'Error in file ' + gutil.colors.magenta(err.module.resource + ':' + err.error.lineNumber + '\n')
				+ gutil.colors.red(err.message)
			);
			notifier.notify({
				title: 'gulp webpack error:',
				message: err.message,
				icon: path.join(__dirname, '../utils/gulp.png')
			});
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
gulp.task('webpack:test', test);
gulp.task('webpack:dev', watch);
gulp.task('webpack:stage', stage);

// Register event handlers
kickstarter.on('gulp.dev', function () {
	gulp.start('webpack:dev');
});
kickstarter.on('gulp.stage', function () {
	gulp.start('webpack:stage');
});

// Export tasks
module.exports = dev;