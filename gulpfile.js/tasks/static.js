var gulp        = require('gulp');
var changed     = require('gulp-changed');
var browserSync = require('browser-sync');
var options     = require('../options');
var kickstarter = require('../utils/kickstarter');

/**
 * Copy static vendor files to destination
 * folder
 * @return {Stream} Gulp stream
 */
var copyStaticFiles = function () {
	return gulp.src(options.static.src)
		.pipe(changed(options.dest))
		.pipe(gulp.dest(options.dest))
		.pipe(browserSync.reload({stream: true}));
};

// Register tasks
gulp.task('static', copyStaticFiles);

// Register event handlers
kickstarter.on('gulp.dev', function () {
	gulp.start('static');
});
kickstarter.on('gulp.stage', function () {
	gulp.start('static');
});

// Export core function
module.exports = copyStaticFiles;