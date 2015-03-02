// Many thanks to:
// https://github.com/greypants/gulp-starter

var gulp     = require('gulp');
var options  = require('../options');
var watchify = require('../utils/getTasks').watchify;

gulp.task('watch', watchify, function() {

	if (options.less.build) {
		gulp.watch(options.less.src, ['less']);
	}

	if (options.jade.build) {
		gulp.watch(options.jade.src, ['jade']);
	}

	if (options.iconfont.build) {
		gulp.watch(options.iconfont.src, ['iconfont']);
	}
});