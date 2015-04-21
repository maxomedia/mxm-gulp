// Many thanks to:
// https://github.com/greypants/gulp-starter

var gulp    = require('gulp');
var minify  = require('gulp-minify-css');
var options = require('../options').less;

gulp.task('minify-css', ['less'], function () {	
	return gulp.src(options.dest + '/**/*.css')
		.pipe( minify() )
		.pipe(
			gulp.dest( function (file) {
			return file.base;
			})
		);
});