var gulp         = require('gulp');
var webpack      = require('webpack');
var browserSync  = require('browser-sync');
var options = require('../options/webpack');
var log          = require('../utils/compileLogger');

/**
 * Shared pack function
 * @param  {Object}   options  webpack options
 * @param  {Function} callback Callback to tell gulp the task
 *                             has finished without errors
 * @return {Object}            webpack instance
 */
function pack (options, callback) {
	return webpack(options, function () {
		if (typeof callback === 'function') callback();
	});
}

// Standalone task
gulp.task('webpack', function (callback) {
	pack(options, callback);
});

// Dev task with file watcher (200ms timeout for repack)
gulp.task('webpack:watch', function (callback) {
	var built = false;

	pack(options).watch(200, function (err, stats) {

		// Gulp like log message
		log(err, stats, 'webpack');

		// Reload page, if browsersync is active
		browserSync.reload();

		// Call callback only once
		if (!built) { built = true; callback(); }
	});
});

// Stage task with uglify passed as plugin
gulp.task('webpack:stage', function (callback) {

	// Adapt stage options and push minify plugin
	options.debug = false;
	options.plugins.push(new webpack.optimize.UglifyJsPlugin());

	pack(options, callback);
});