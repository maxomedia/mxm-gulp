var gulp  = require('gulp');
var options = require('../options');
var tasks = require('../utils/getTasks').stage();

gulp.task('stage', tasks);