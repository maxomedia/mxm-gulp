var gulp         = require('gulp');
var jade         = require('gulp-jade');
var browserSync  = require('browser-sync');
var options      = require('../options').jade;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Compile jade files in the views directory
 * @return {Object} Gulp stream
 */
function compileJade () {

	// Define source files
	return gulp.src( options.views )

	// Compile files
	.pipe( jade({
		pretty: !options.minify,
		locals: options.locals
	}))

	// Handle them errors
	.on( 'error', handleErrors)

	// Save to destination
	.pipe( gulp.dest( options.dest ) )

	// Reolad page
	.pipe(browserSync.reload({stream: true}));
}

// Register task
gulp.task('jade', compileJade);
gulp.task('jade:dev', function () {
	gulp.watch(options.src, ['jade']);
});

// Register event handler
kickstarter.on('gulp.dev', function () {
	gulp.start('jade:dev');
});
kickstarter.on('gulp.stage', function () {
	gulp.start('jade');
});

// Export task
module.exports = compileJade;