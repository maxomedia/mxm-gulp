var gulp  = require('gulp');
var options = require('../options');
var tasks = require('../utils/getTasks').dev();

gulp.task('dev', tasks);