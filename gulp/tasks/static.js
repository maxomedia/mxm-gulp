var gulp        = require('gulp');
var newer       = require('gulp-newer');
var browserSync = require('browser-sync');
var options     = require('../options');
var watch       = require('gulp-watch');
var kickstarter = require('../utils/kickstarter');
var gutil       = require('gulp-util');

/**
 * Copy static vendor files to destination
 * folder
 * @return {Stream} Gulp stream
 */
var copyStaticFiles = function () {
	return gulp.src(options.static.src)
		.pipe(newer(options.dest))
		.pipe(gulp.dest(options.dest))
		.pipe(browserSync.reload({stream: true}));
};

/**
 * Watch static files for changes
 * @return {Stream} Gulp stream
 */
var dev = function () {
	return watch(options.static.src, function () {
		gulp.start('static');
	});
}

// Register tasks
gulp.task('static', copyStaticFiles);
gulp.task('static:dev', dev);
gulp.task('static:stage', ['tinypng'], copyStaticFiles);

// Register event handlers
kickstarter.on('gulp.dev', dev);
kickstarter.on('gulp.stage', function () {
	gulp.start('static');
});

// Export core function
module.exports = copyStaticFiles;