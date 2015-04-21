// Many thanks to:
// https://github.com/greypants/gulp-starter

var gulp       = require('gulp');
var browserify = require('./browserify');

gulp.task('watchify', function() {
	return browserify(true);
});