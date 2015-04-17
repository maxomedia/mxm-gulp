// Dependencies
// ============

var gulp         = require('gulp');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var options      = require('../options').less;
var browserSync  = require('browser-sync');
var handleErrors = require('../utils/handleErrors');
var _ = require('lodash');



// Tasks
// =====
gulp.task('less', function (){

	var defaults = {
		autoprefix: [
			'Android >= 2.3',
			'Chrome >= 20',
			'Firefox >= 24',
			'Explorer >= 9',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'
		]
	};

	// Handle option errors
	if (!options.src) return console.log('Gulp less task: no src specified');
	if (!options.dest) return console.log('Gulp less task: no dest specified');

	// Handle glob if no main file is specified
	if (!options.main) options.main = options.src;

	// Extend autoprefixer defaults
	options = _.extend({}, defaults, options);

	// Start piping with main file
	return gulp.src(options.main)

		// Initialize sourcemaps
		.pipe( sourcemaps.init() )

		// Compile and autoprefix less
		.pipe( less() )

		.on('error', handleErrors)

		// Autoprefix
		.pipe( autoprefixer() )

		.on('error', handleErrors)

		// Generate sourcemap
		.pipe( sourcemaps.write() )

		// Save compiled css
		.pipe( gulp.dest(options.dest) )

		// Reload page with browsersync
		.pipe(browserSync.reload({stream: true}));
});