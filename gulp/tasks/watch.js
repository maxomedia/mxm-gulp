// Many thanks to:
// https://github.com/greypants/gulp-starter

var gulp    = require('gulp');
var options = require('../options');

gulp.task('watch', ['watchify'], function() {
	gulp.watch(options.less.src, ['less']);
	gulp.watch(options.jade.src, ['jade']);
	gulp.watch(options.iconfont.src, ['iconfont']);
});