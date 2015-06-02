var gulp        = require('gulp');
var browserSync = require('browser-sync');
var options     = require('../options').browserSync;
var kickstarter = require('../utils/kickstarter');

/**
 * Start browserSync with given options
 * @return {undefined}
 */
function startSyncing () {
	browserSync(options);
}

// Register task
gulp.task('browserSync', startSyncing);

// Register event handler
kickstarter.on('gulp.dev', function () {
	gulp.start('browserSync');
});

// Export task
module.exports = startSyncing;