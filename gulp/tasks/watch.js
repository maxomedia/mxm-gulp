var gulp           = require('gulp');
var gutil          = require('gulp-util');

var browserSync    = require('./browser-sync');
var pugTask        = require('./pug');
var staticTask     = require('./static');
var sassTask       = require('./sass');
var svgSpriteTask  = require('./svg-sprite');
var jsTask         = require('./js');
var handlebarsTask = require('./handlebars');
var watchTask      = require('./watch');
var options        = require('../options');

var watchTask = function (done) {
	gulp.watch(options.handlebars.src, handlebarsTask);
	gulp.watch(options.sass.watch).on('change', function (file) {
		console.time('sass');
		gutil.log('Starting \'' + gutil.colors.cyan('compileSass') + '\'...');
		sassTask(file).on('finish', function () {
			gutil.log('Finished \'' + gutil.colors.cyan('compileSass') + '\'...');
			console.timeEnd('sass');
		});
	});	
	gulp.watch(options.static.src, staticTask);
	gulp.watch(options.js.watch, jsTask);
	gulp.watch(options.svgSprite.src, svgSpriteTask);
	browserSync.task(done);
}

module.exports = watchTask;