// Many thanks to:
// https://github.com/greypants/gulp-starter

var gulp    = require('gulp');
var options = require('../options');
var tasks   = require('../utils/getTasks');

gulp.task('watch', tasks.watchify(), function() {

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