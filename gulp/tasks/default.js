var gulp = require('gulp');
var exec = require('child_process').exec;
var options = require('../options');

exec('title ' + options.name);

gulp.task('default', ['less', 'jade', 'iconfont', 'watch']);