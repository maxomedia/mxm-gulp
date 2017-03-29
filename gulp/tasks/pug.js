var gulp         = require('gulp');
var pug          = require('gulp-pug');
var deepAssign   = require('deep-assign');
var browserSync  = require('./browser-sync').server;
var plumber      = require('gulp-plumber');
var gulpOptions  = require('../options');
var errorHandler = require('../utils/errorHandler');

var defaultOptions = {

	// Jade files to watch for changes
	src: gulpOptions.src + '/pug/**/*.pug',

	// Destination for html files
	dest: gulpOptions.dest + '/pug',

	// Entry points for views resulting in HTML pages
	views: gulpOptions.src + '/pug/views/**/*.pug',

	// Options to pass to gulp-jade
	options: {
		pretty: true,
		basedir: root,
	}
};

var options = deepAssign(defaultOptions, gulpOptions);

/**
 * Compile pug files in the views directory
 * @return {Object} Gulp stream
 */
function compilePug () {

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