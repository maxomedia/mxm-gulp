// Dependencies
var gulp          = require('gulp');
var less          = require('gulp-less');
var concat        = require('gulp-concat');
var cached        = require('gulp-cached');
var progeny       = require('gulp-progeny');
var remember      = require('gulp-remember');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var options       = require('../options/less');
var browserSync   = require('browser-sync');
var watcher       = require('gulp-watch');
var filelog       = require('gulp-filelog');

// Tasks
gulp.task('incremental-less', build);
gulp.task('incremental-less:watch', watch);

/**
 * The actual task to compile less
 * to css, manage the caches, write
 * the sourcemap and run autoprefixer.
 * 
 * @return {Object} Gulp stream
 */
function build () {
	return gulp.src(options.src)
		
		// Add new files to cache
		.pipe(cached('less'))
		.pipe(progeny({
            regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
        }))
		.pipe(filelog())
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', function (err) { console.log(err); })
		.pipe(remember('less'))
		.pipe(autoprefixer())
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(options.dest));		
}

/**
 * Watcher task using gulp-watch. Uses the
 * callback given from gulp to notify gulp
 * the task is complete.
 * 
 * @param  {Function} callback Gulp task callback
 */
function watch (callback) {
	watcher(options.src, watchHandler);
	callback();
}

/**
 * Decide which handler to trigger based
 * on the event type
 * 
 * @param  {Object} file File that triggered the event
 */
function watchHandler (file) {
	switch(file.event) {
		case 'change':
			onChange(file);
			break;
		case 'unlink':
			onUnlink(file);
			break;
		case 'add':
			onChange(file);
			break;
		default:
			console.log('Unhandled incremental-less:watch event: ' + file.event);
			break;
	}
}

/**
 * A file has been changed, trigger build
 * and reload browserSync after task has
 * finished.
 */
function onChange () {
	var stream = build();

	stream.on('end', function (){
		browserSync.reload();
	});
}

/**
 * A file has been deleted, remove it from
 * the caches. Then build remaining less files
 * and reload browserSync
 * 
 * @param  {Object} file File that has been removed
 */
function onUnlink (file) {

	var fileName = replaceExtension(file.path, 'css');

	delete cached.caches['less'][file.path];
	remember.forget('less', fileName);

	onChange();
}

/**
 * Replace the extension of a file path
 * @param  {String} path      The path
 * @param  {String} extension The new extension, with or without the dot
 * @return {String}           Path with the new extension
 */
function replaceExtension (path, extension) {
	if (extension.indexOf('.') < 0) extension = '.' + extension;
	return path.substr(0, path.lastIndexOf('.')) + extension;
}