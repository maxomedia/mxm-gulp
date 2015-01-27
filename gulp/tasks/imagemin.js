/*var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var options     = require('../options').imagemin;

gulp.task('imagemin', function() {
  return gulp.src( options.src )
    .pipe( changed( options.src ) ) // Ignore unchanged files
    .pipe( imagemin() ) // Optimize
    .pipe( gulp.dest( function ( file ) {
    	return file.base;
    }));
});*/