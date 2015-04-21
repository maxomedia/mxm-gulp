var gulp        = require('gulp');
var browserSync = require('browser-sync');
var options     = require('../options').browserSync;

gulp.task('browserSync', function() {
  	browserSync(options);
});