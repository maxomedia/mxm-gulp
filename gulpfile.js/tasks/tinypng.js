var gulp         = require('gulp');
var options      = require('../options').tinypng;
var handleErrors = require('../utils/handleErrors');
var tinypng      = require('gulp-tinypng');
var kickstarter  = require('../utils/kickstarter');
var newer        = require('gulp-newer');
var del          = require('del');
var vinylPaths   = require('vinyl-paths');
var watch        = require('gulp-watch');
var cached = require('gulp-cached');

/**
 * Minify images in src folder and
 * save them at dest, deleting the src.
 * @return {Stream} Gulp stream
 */
function tinyPNG () {
	return gulp.src(options.src)
		.pipe(newer())
		.pipe(cached())
		.pipe(tinypng(options.apikey))
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(options.dest));
}

/**
 * Use gulp watch to detect file changes in src
 * folder and kick off tinyPNG to compile the file
 * @return {Stream} gulp-watch stream
 */
function dev () {[]
	return watch(options.src).on('add', tinyPNG);
}

// Register task
gulp.task('tinypng', tinyPNG);
gulp.task('tinypng:dev', dev);

// Register event handler
kickstarter.on('gulp.dev', dev);
kickstarter.on('gulp.stage', tinyPNG);

// Export task
module.exports = tinyPNG;