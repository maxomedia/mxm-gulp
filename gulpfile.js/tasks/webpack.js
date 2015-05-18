var gulp        = require('gulp');
var webpack     = require('webpack');
var browserSync = require('browser-sync');
var options     = require('../options/webpack');
var log         = require('../utils/compileLogger');
var kickstarter = require('../utils/kickstarter');

function pack (opt, callback) {
	return webpack(opt, callback);
}

/**
 * Development task with file watcher
 * @param  {Function} callback Gulp callback for
 *                             completing the task
 * @return {undefined}
 */
function startWatching (callback) {
	webpack(options).watch(200, endPackCallback(callback, true));
}

/**
 * Staging task with uglify plugin and debug
 * option disabled.
 * @param  {Function} callback Gulp callback for
 *                             completing the task
 * @return {undefined}
 */
function compileAndMinify (callback) {

	// Adapt stage options and push minify plugin
	options.debug = false;
	options.plugins.push(new webpack.optimize.UglifyJsPlugin());

	webpack(options, endPackCallback(callback, false));
}

/**
 * Handle returnal to notice gulp of task
 * completion and write a log if needed.
 * @param  {Function} callback Callback needed by gulp
 * @param  {Boolean}   writeLog Wether or not to output log info
 * @return {Function}            Callback handler
 */
function endPackCallback (callback, writeLog) {
	var built = false;

	return function (err, stats) {

		// Gulp like log message
		if (writeLog) log(err, stats, 'webpack');

		// Reload page, if browsersync is active
		browserSync.reload();

		// Call callback only once
		if (!built) {
			built = true;
			if (typeof callback === 'function') callback();
		}
	}
}

// Register tasks
gulp.task('webpack', function (callback) {
	webpack(options, endPackCallback(callback, false));
});
gulp.task('webpack:dev', startWatching);
gulp.task('webpack:stage', compileAndMinify);

// Register event handlers
kickstarter.on('gulp.dev', startWatching);
kickstarter.on('gulp.stage', compileAndMinify);

// Export tasks
module.exports.default = pack;
module.exports.dev = startWatching;
module.exports.stage = compileAndMinify;