var gulp          = require('gulp');
var package       = require('./package.json');
var childProcess  = require('child_process');
var options       = require('./gulp/options');
var browserSync   = require('./gulp/tasks/browser-sync')
var pugTask       = require('./gulp/tasks/pug');
var staticTask    = require('./gulp/tasks/static');
var sassTask      = require('./gulp/tasks/sass');
var svgSpriteTask = require('./gulp/tasks/svg-sprite');
var webpackTask   = require('./gulp/tasks/webpack');

gulp.task('default', ['dev']);

gulp.task('dev', [
	'static:dev',
	'sass:dev',
	'svg-sprite:dev',
	'webpack:dev',
	'pug:dev',
	'browser-sync'
]);

gulp.task('stage', [
	'static:stage',
	'sass:stage',
	'svg-sprite:stage',
	'webpack:stage',
	'pug:stage',
]);


childProcess.exec('title ' + package.name);