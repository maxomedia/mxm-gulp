var gulp    = require('gulp');
var rimraf  = require('rimraf');
var options = require('../options');

/**
 * Remove the entire dist folder and its contents
 * @param  {Function} callback Callback provided by gulp
 * @return {Object}            Rimraf returnal
 */
var cleanUp = function (callback) {
	return rimraf(options.dest, callback);
};

// Register task
gulp.task('clean', cleanUp);

// Export core function
module.exports = cleanUp;