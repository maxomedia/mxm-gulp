// Dependencies
// ============

var gulp                 = require('gulp');
var less                 = require('gulp-less');
var lessPluginAutoprefix = require('less-plugin-autoprefix');
var sourcemaps           = require('gulp-sourcemaps');
var options              = require('../options').less;
var handleErrors         = require('../utils/handleErrors');

// Get an autoprefixer instance
var autoprefixer = new lessPluginAutoprefix({browsers: options.autoprefix});

// Tasks
// =====
gulp.task('less', function (){

	// Handle option errors
	if (!options.src) return console.log('Gulp less task: no src specified');
	if (!options.dest) return console.log('Gulp less task: no dest specified');
	if (!options.sourceMapRoot) return console.log('Gulp less task: no sourceMapRoot defined');

	// Handle glob if no main file is specified
	if (!options.main) options.main = options.src;

	// Start piping with main file
	return gulp.src(options.main)

		// Initialize sourcemaps
		.pipe( sourcemaps.init() )

		// Compile and autoprefix less
		.pipe( less({
			plugins: [autoprefixer]
		}) )

		.on('error', handleErrors)

		// Generate sourcemap
		.pipe( sourcemaps.write('/', {sourceMappingURLPrefix: options.sourceMapRoot}) )

		// Save compiled css
		.pipe( gulp.dest(options.dest) );
});