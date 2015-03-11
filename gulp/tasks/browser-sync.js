var gulp        = require('gulp');
var browserSync = require('browser-sync');
var options     = require('../options').browserSync;

gulp.task('browserSync', function() {
	if (!options.active) return false;
  	browserSync(options);
});