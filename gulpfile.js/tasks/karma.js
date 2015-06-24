var gulp  = require('gulp');
var karma = require('karma');

/**
 * Start the karma test
 * @param  {Function} callback Karma callback
 * @return {undefined}
 */
var karmaTest = function (callback) {
	karma.server.start( {
		configFile: process.cwd() + '/karma.conf.js',
		singleRun: true
	}, function (exitStatus) {
		callback(exitStatus ? 'There are failing unit tests' : undefined);
	});
}

// Register task
gulp.task('karma', ['install', 'clean'], karmaTest);

// Export test function
module.exports = karmaTest;