var gulp         = require('gulp');
var less         = require('gulp-less');
var watch        = require('gulp-watch');
var browserSync  = require('browser-sync');
var sourcemaps   = require('gulp-sourcemaps');
var minify       = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var options      = require('../options').less;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Compile less files into CSS, but do 
 * not save them yet, minify-css task needs
 * the stream to minify the shit out of these
 * files.
 * @return {Object} Gulp stream
 */
function compileLess () {

	// Start piping with main file
	return gulp.src(options.main)

		// Initialize sourcemaps
		.pipe( sourcemaps.init() )

		// Compile less
		.pipe( less(options.options.less) )

		// Handle errors
		.on('error', handleErrors)

		// Autoprefix
		.pipe( autoprefixer(options.options.autoprefixer) )

		// Handle autoprefixer errors
		.on('error', handleErrors);
}

/**
 * Watch static files for changes
 * @return {Stream} Gulp stream
 */
var dev = function () {
	if (!options) return;

	return watch(options.src, function () {
		gulp.start('less');
	});
};

// Register task and 
gulp.task('less', function () {

	if (!options) return;

	return compileLess()

		// Generate sourcemap
		.pipe( sourcemaps.write('/', options.options.sourcemaps) )

		// Save compiled css
		.pipe( gulp.dest(options.dest) )

		// Reload page with browsersync
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('less:dev', dev);

gulp.task('less:stage', ['fonticons'], function () {

	if (!options) return;
	
	return compileLess()
		.pipe(minify())

		// Generate sourcemap
		.pipe( sourcemaps.write('/', options.options.sourcemaps) )

		// Save compiled css
		.pipe( gulp.dest(options.dest) )

		// Reload page with browsersync
		.pipe(browserSync.reload({stream: true}));
});

// Register event handlers
kickstarter.on('gulp.dev', dev);
kickstarter.on('gulp.stage', function () {
	gulp.start('less:stage');
});

// Export task
module.exports = compileLess;