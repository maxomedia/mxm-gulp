var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var options     = require('../options').browserSync;

/**
 * Start browserSync with given options
 * @return {undefined}
 */
function startSyncing () {
	return browserSync.init(options);
}

// Register task
gulp.task('browser-sync', startSyncing);

// Export server
module.exports = browserSync;