var gulp        = require('gulp');
var pug         = require('gulp-pug');
var browserSync = require('./browser-sync').server;
var plumber     = require('gulp-plumber');
var options     = require('../options').pug;
var errorHandler = require('../utils/errorHandler');

/**
 * Compile pug files in the views directory
 * @return {Object} Gulp stream
 */
function compilePug () {

	// Exit criteria
	if (!options) return;

	// Define source files
	return gulp.src(options.views)

	// Catch and log errors
	.pipe(plumber(errorHandler))

	// Compile files
	.pipe(pug(options.options))

	// Save to destination
	.pipe(gulp.dest(options.dest))

	// Reolad page
	.pipe(browserSync.stream());
}

// Export task
module.exports = compilePug;