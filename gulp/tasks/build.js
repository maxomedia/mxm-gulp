var gulp           = require('gulp');

var pugTask        = require('./pug');
var staticTask     = require('./static');
var sassTask       = require('./sass');
var svgSpriteTask  = require('./svg-sprite');
var jsTask         = require('./js');
var handlebarsTask = require('./handlebars');

var buildTask = gulp.series(
	gulp.parallel(staticTask, svgSpriteTask),
	gulp.parallel(sassTask, jsTask, handlebarsTask)
);

module.exports = buildTask;