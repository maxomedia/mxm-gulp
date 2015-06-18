var gulp         = require('gulp');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var options      = require('../options/less');
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');
var minify       = require('gulp-minify-css');

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
		.pipe( less() )

		// Handle errors
		.on('error', handleErrors)

		// Autoprefix
		.pipe( autoprefixer() )

		// Handle autoprefixer errors
		.on('error', handleErrors);
}

// Register task and 
gulp.task('less', function () {
	return compileLess()
	// Generate sourcemap
	.pipe( sourcemaps.write('/', {
		sourceMappingURLPrefix: options.webroot + '/css'
	}) )

	// Save compiled css
	.pipe( gulp.dest(options.dest) )

	// Reload page with browsersync
	.pipe(browserSync.reload({stream: true}));
});
gulp.task('less:dev', function () {
	gulp.watch(options.src, ['less']);
});
gulp.task('less:stage', function () {
	return compileLess()
	.pipe(minify({processImport: false}))
	// Generate sourcemap
	.pipe( sourcemaps.write('/', {
		sourceMappingURLPrefix: options.webroot + '/css'
	}) )

	// Save compiled css
	.pipe( gulp.dest(options.dest) )

	// Reload page with browsersync
	.pipe(browserSync.reload({stream: true}));
});

// Register event handlers
kickstarter.on('gulp.dev', function () {
	gulp.start('less:dev');
});
kickstarter.on('gulp.stage', function () {
	gulp.start('less:stage');
});

// Export task
module.exports = compileLess;