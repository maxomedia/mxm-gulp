var gulp  = require('gulp');
var events = require('../utils/events');

gulp.task('dev', function() {
	events.emit('gulp.dev');
});