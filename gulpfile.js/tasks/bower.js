var gulp  = require('gulp');
var bower = require('gulp-bower');

/**
 * Install bower components
 * @return {Stream} Gulp stream
 */
var bowerInstall = function () {
	return bower().pipe(gulp.dest('bower_components'));
};

// Register task
gulp.task('bower', ['clean'], bowerInstall);

// Export core function
module.exports = bowerInstall;