// Many thanks to:
// https://github.com/greypants/gulp-starter

var gulp    = require('gulp');
var minify  = require('gulp-minify-css');
var rename  = require('gulp-rename');
var options = require('../options').less;

gulp.task('minify-css', ['less'], function () {
	var name = filename(options.main);
	
	return gulp.src(options.dest + '/' + name + '.css')
		.pipe( minify() )
		.pipe( rename({suffix: options.suffix}) )
		.pipe( gulp.dest( function (file) {
			return file.base;
		}) );
});

function filename (path) {
	var name = path.split('\\').pop().split('/').pop();
	return name.substr(0, name.lastIndexOf('.'));
}