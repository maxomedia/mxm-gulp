var gulp  = require('gulp');
var options = require('../options');

var tasks = [];

// Ony add enabled tasks
if (options.less.build)     tasks.push('less');
if (options.jade.build)     tasks.push('jade');
if (options.js.build)       tasks.push('browserify');
if (options.iconfont.build) tasks.push('iconfont');

gulp.task('dev', tasks);