var gulp         = require('gulp');
var jade         = require('gulp-jade');
var browserSync  = require('browser-sync');
var watch        = require('gulp-watch');
var gutil        = require('gulp-util');
var options      = require('../options').jade;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Compile jade files in the views directory
 * @return {Object} Gulp stream
 */
function compileJade () {

	// Exit criteria
	if (!options) return;

	// Define source files
	return gulp.src( options.views )

	// Compile files
	.pipe( jade(options.options))

	// Handle them errors
	.on( 'error', handleErrors)

	// Save to destination
	.pipe( gulp.dest( options.dest ) )

	// Reolad page
	.pipe(browserSync.reload({stream: true}));
}

/**
 * Watch jade files for changes
 * @return {Stream} Gulp stream
 */
var dev = function () {

	// Exit criteria
	if (!options) return;

	return watch(options.src, function () {
		gulp.start('jade');
	});
}

// Register task
gulp.task('jade', compileJade);
gulp.task('jade:dev', dev);
gulp.task('jade:stage', compileJade);

// Register event handler
kickstarter.on('gulp.dev', dev);
kickstarter.on('gulp.stage', function () {
	gulp.start('jade');
});

// Export task
module.exports = compileJade;