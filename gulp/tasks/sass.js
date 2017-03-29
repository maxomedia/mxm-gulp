var gulp         = require('gulp');
var path         = require('path');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var deepAssign   = require('deep-assign');
var gulpOptions  = require('../options');
var plumber      = require('gulp-plumber');
var browserSync  = require('./browser-sync').server;
var errorHandler = require('../utils/errorHandler');

// Merge default options with options from 
// main options file
var defaultOptions = {
	src: gulpOptions.src + '/sass/**/*.scss',
	main: gulpOptions.src + '/sass/main.scss',
	dest: gulpOptions.dest + '/css',

	options: {
		nodeSass: {
			includePaths: ['node_modules'],
		},
		autoprefixer: {
			browsers: ['last 2 versions']
		},
		sourcemaps: {
			sourceMappingURLPrefix: gulpOptions.webroot + '/css'
		}
	}
};
var options = deepAssign(defaultOptions, gulpOptions.sass);
var passedOpt = options.options;

/**
 * Compile the sass, handle errors, use autoprefixer
 * and write the sourcemap
 * @return {Stream} Gulp stream
 */
var compileSass = function () {
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
		.pipe(browserSync.stream({match: '**/*.css'}));
}

// Expose sass task
module.exports = compileSass;