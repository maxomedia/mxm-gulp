var gulp          = require('gulp');
var childProcess  = require('child_process');
var package       = require('./package.json');
var options       = require('./gulp/options');
var browserSync   = require('./gulp/tasks/browser-sync');
var pugTask       = require('./gulp/tasks/pug');
var staticTask    = require('./gulp/tasks/static');
var sassTask      = require('./gulp/tasks/sass');
var svgSpriteTask = require('./gulp/tasks/svg-sprite');
var webpackTask   = require('./gulp/tasks/webpack');

gulp.task('default', ['watch']);
gulp.task('build', ['static','sass','svg-sprite','webpack','pug']);

gulp.task('watch', ['build', 'serve'], function () {
	gulp.watch(options.pug.src, ['pug']);
	gulp.watch(options.sass.src, ['sass']);
	gulp.watch(options.static.src, ['static']);
	gulp.watch(options.svgSprite.src, ['svg-sprite']);
	gulp.watch(options.webpack.src, ['webpack']);
});

gulp.task('serve', browserSync.task);
gulp.task('pug', ['svg-sprite'], pugTask);
gulp.task('sass', sassTask);
gulp.task('static', staticTask);
gulp.task('svg-sprite', svgSpriteTask);
gulp.task('webpack', webpackTask);

// Set console title to package name
childProcess.exec('title ' + package.name);