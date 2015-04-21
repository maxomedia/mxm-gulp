var gulp = require('gulp');
var babel = require('gulp-babel');
var options = require('../options.js').es6;

gulp.task('es6', function () {
	return gulp.src(options.src)
		.pipe(babel())
		.pipe(gulp.dest(options.dest));
});