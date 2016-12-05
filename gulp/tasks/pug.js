var gulp         = require('gulp');
var pug         = require('gulp-pug');
var browserSync  = require('browser-sync');
var watch        = require('gulp-watch');
var gutil        = require('gulp-util');
var options      = require('../options').pug;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Compile pug files in the views directory
 * @return {Object} Gulp stream
 */
function compilePug () {

	// Exit criteria
	if (!options) return;

	// Define source files
	return gulp.src( options.views )

	// Compile files
	.pipe( pug(options.options))

	// Handle them errors
	.on( 'error', handleErrors)

	// Save to destination
	.pipe( gulp.dest( options.dest ) )

	// Reolad page
	.pipe(browserSync.reload({stream: true}));
}

/**
 * Watch pug files for changes
 * @return {Stream} Gulp stream
 */
var dev = function () {

	// Exit criteria
	if (!options) return;

	return watch(options.src, function () {
		gulp.start('pug');
	});
}

// Register task
gulp.task('pug', compilePug);
gulp.task('pug:dev', dev);
gulp.task('pug:stage', compilePug);

// Register event handler
kickstarter.on('gulp.dev', dev);
kickstarter.on('gulp.stage', function () {
	gulp.start('pug');
});

// Export task
module.exports = compilePug;