var gulp        = require('gulp');
var install     = require('gulp-install');
var kickstarter = require('../utils/kickstarter');

/**
 * Install dependencies like bower or
 * npm modules
 * @return {Stream} Gulp stream
 */
var installDependencies = function () {
	return gulp.src(['./package.json', './bower.json'])
	.pipe(install());
}

// Register task
gulp.task('install', installDependencies);

// Export core function
module.exports = installDependencies;