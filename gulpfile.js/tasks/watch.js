var gulp        = require('gulp');
var kickstarter = require('../utils/kickstarter');


gulp.task('watch', tasks, function() {

	kickstarter.emit('gulp.watch');

	if (options.less && !options.less.incremental) {
		gulp.watch(options.less.src, ['less']);
	}

	if (options.fonticons) {
		gulp.watch(options.fonticons.src, ['fonticons']);
	}
});