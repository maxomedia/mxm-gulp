// Many thanks to:
// https://github.com/greypants/gulp-starter

var gulp    = require('gulp');
var options = require('../options');
var tasks   = require('../utils/getTasks').watch();


gulp.task('watch', tasks, function() {

	if (options.less && !options.less.incremental) {
		gulp.watch(options.less.src, ['less']);
	}

	if (options.less && options.less.incremental) {
		gulp.watch(options.less.src, ['incremental-less']);
	}

	if (options.jade) {
		gulp.watch(options.jade.src, ['jade']);
	}

	if (options.fonticons) {
		gulp.watch(options.fonticons.src, ['fonticons']);
	}

	if (options.es6) {
		gulp.watch(options.es6.src, ['es6']);
	}
});