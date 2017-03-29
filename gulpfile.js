var gulp           = require('gulp');
var childProcess   = require('child_process');
var package        = require('./package.json');

var browserSync    = require('./gulp/tasks/browser-sync');
var pugTask        = require('./gulp/tasks/pug');
var staticTask     = require('./gulp/tasks/static');
var sassTask       = require('./gulp/tasks/sass');
var svgSpriteTask  = require('./gulp/tasks/svg-sprite');
var webpackTask    = require('./gulp/tasks/webpack');
var handlebarsTask = require('./gulp/tasks/handlebars');
var options        = require('./gulp/options');

function setProduction(done) {
	process.argv.push('--production');
	done();
}

var buildTask = gulp.series(
	gulp.parallel(staticTask, svgSpriteTask),
	gulp.parallel(sassTask, webpackTask, handlebarsTask)
);

var watchTask = function (done) {
	gulp.watch(options.handlebars.src, handlebarsTask);
	gulp.watch(options.sass.src, sassTask);
	gulp.watch(options.static.src, staticTask);
	gulp.watch(options.webpack.src, webpackTask);
	gulp.watch(options.svgSprite.src, svgSpriteTask);
	browserSync.task(done);
}

gulp.task('default', gulp.series(buildTask, watchTask));
gulp.task('build', buildTask);
gulp.task('stage', gulp.series(setProduction, buildTask));

gulp.task('sass', sassTask);
gulp.task('static', staticTask);
gulp.task('webpack', webpackTask);
gulp.task('svg-sprite', svgSpriteTask);
gulp.task('pug', gulp.series(svgSpriteTask, pugTask));
gulp.task('handlebars', gulp.series(svgSpriteTask, handlebarsTask));
gulp.task('serve', gulp.series(buildTask, browserSync.task));
gulp.task('watch', watchTask);

// Set console title to package name
childProcess.exec('title ' + package.name);