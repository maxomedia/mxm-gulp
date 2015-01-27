var gulp = require('gulp');

global.dev = true;

gulp.task('dev', ['less', 'js', 'jade']);