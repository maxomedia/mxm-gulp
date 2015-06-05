var gulp        = require('gulp');
var kickstarter = require('../utils/kickstarter');

// Development build (watchers, live reload)
gulp.task('dev', function() {
	kickstarter.emit('gulp.dev');
});

// Production build (production ready assets)
gulp.task('stage', ['karma'], function () {
	kickstarter.emit('gulp.stage');
});