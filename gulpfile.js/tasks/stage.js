var gulp  = require('gulp');
var options = require('../options');

var tasks = ['dev'];

if (options.less.minify) tasks.push('minify-css');
if (options.js.minify)   tasks.push('minify-js');
// TODO: add jade minify task

gulp.task('stage', tasks);