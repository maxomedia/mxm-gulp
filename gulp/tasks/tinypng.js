var gulp         = require('gulp');
var tinypng      = require('gulp-tinypng');
var newer        = require('gulp-newer');
var watch        = require('gulp-watch');
var gutil        = require('gulp-util');
var cached       = require('gulp-cached');
var del          = require('del');
var vinylPaths   = require('vinyl-paths');
var options      = require('../options').tinypng;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Minify images in src folder and
 * save them at dest, deleting the src.
 * If a file is already present at dest,
 * it is left untouched, thus making sure
 * no data is lost at any time.
 * @return {Stream} Gulp stream
 */
function tinyPNG () {
	return gulp.src(options.src)
		.pipe(newer(options.dest))
		.pipe(cached('src/tinypng'))
		.pipe(tinypng(options.apikey))
		.on('error', handleErrors)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(options.dest));
}

/**
 * Use gulp watch to detect file changes in src
 * folder and kick off tinyPNG to compile the file
 * @return {Stream} gulp-watch stream
 */
function dev () {
	return watch(options.src).on('add', function () {
		gulp.start('tinypng');
	});
}

// Register task
gulp.task('tinypng', tinyPNG);
gulp.task('tinypng:dev', dev);
gulp.task('tinypng:stage', tinyPNG);

// Register event handler
kickstarter.on('gulp.dev', dev);

// Export task
module.exports = tinyPNG;