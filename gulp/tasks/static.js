var gulp        = require('gulp');
var newer       = require('gulp-newer');
var browserSync = require('browser-sync');
var options     = require('../options');
var plumber     = require('gulp-plumber');

/**
 * Copy static vendor files to destination
 * folder
 * @return {Stream} Gulp stream
 */
var copyStaticFiles = function () {
	if (!options) return;

	return gulp.src(options.static.src)
		.pipe(plumber())
		.pipe(newer(options.dest))
		.pipe(gulp.dest(options.dest))
		.pipe(browserSync.stream());
};

// Register tasks
gulp.task('static', copyStaticFiles);
gulp.task('static:stage', copyStaticFiles);
gulp.task('static:dev', function () {
	gulp.watch(options.static.scr, ['static']);
});

// Export core function
module.exports = copyStaticFiles;