var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var watch        = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var options      = require('../options').sass;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');
var passedOpt    = options.options;

var compileSass = function () {
	return gulp.src(options.main)
		.pipe(sourcemaps.init())
		.pipe(sass(passedOpt.sass).on('error', handleErrors))
		.pipe(autoprefixer(passedOpt.autoprefixer))
		.pipe(sourcemaps.write('/', passedOpt.sourcemaps))
		.pipe(gulp.dest(options.dest));
}

var dev = function () {
	if (!options) return;

	return watch(options.src, function () {
		gulp.start('sass');
	});
};

var stage = function () {
	passedOpt.outputStyle = 'compressed';
	return compileSass();
};

gulp.task('sass', compileSass);
gulp.task('sass:dev', dev);
gulp.task('sass:stage', stage);

kickstarter.on('gulp.dev', dev);
kickstarter.on('gulp.stage', stage);

module.exports = compileSass;