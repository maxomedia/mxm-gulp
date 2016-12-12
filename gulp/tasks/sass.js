var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var options      = require('../options').sass;
var plumber      = require('gulp-plumber');
var browserSync  = require('./browser-sync').server;
var passedOpt    = options.options;
var errorHandler = require('../utils/errorHandler');

/**
 * Compile the sass, handle errors, use autoprefixer
 * and write the sourcemap
 * @return {Stream} Gulp stream
 */
var compileSass = function () {
	if (!options) return;

	if (process.argv.indexOf('--production') > -1) {
		passedOpt.nodeSass.outputStyle = 'compressed';
	}

	return gulp.src(options.main)
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init())
		.pipe(sass(passedOpt.nodeSass))
		.pipe(autoprefixer(passedOpt.autoprefixer))
		.pipe(sourcemaps.write('/', passedOpt.sourcemaps))
		.pipe(gulp.dest(options.dest))
		.pipe(browserSync.stream());
}

// Expose sass task
module.exports = compileSass;