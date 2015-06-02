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
var copyVendorFiles = function () {
	return gulp.src(options.vendor.src)
		.pipe(changed(options.dest))
		.pipe(gulp.dest(options.dest))
		.pipe(browserSync.reload({stream: true}));
};

// Register tasks
gulp.task('vendor', copyVendorFiles);

// Register event handlers
kickstarter.on('gulp.dev', function () {
	gulp.start('vendor');
});
kickstarter.on('gulp.stage', function () {
	gulp.start('vendor');
});

// Export core function
module.exports = copyVendorFiles;