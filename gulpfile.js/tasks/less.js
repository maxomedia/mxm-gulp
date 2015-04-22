// Dependencies
// ============

var gulp         = require('gulp');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var options      = require('../options/less');
var browserSync  = require('browser-sync');
var handleErrors = require('../utils/handleErrors');


// Tasks
// =====
gulp.task('less', function (){

	// Handle option errors
	if (!options.src) return console.log('Gulp less task: no src specified');
	if (!options.dest) return console.log('Gulp less task: no dest specified');

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
		.pipe( sourcemaps.write('/', {
			sourceMappingURLPrefix: options.webroot + '/css'
		}) )

		// Save compiled css
		.pipe( gulp.dest(options.dest) )

		// Reload page with browsersync
		.pipe(browserSync.reload({stream: true}));
});