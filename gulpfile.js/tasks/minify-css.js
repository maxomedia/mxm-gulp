var gulp        = require('gulp');
var minify      = require('gulp-minify-css');
var options     = require('../options/less');
var kickstarter = require('../utils/kickstarter');
var less        = require('./less');

		var sourcemaps   = require('gulp-sourcemaps');
/**
 * Minify all CSS bundles in dest folder
 * @return {Object} Gulp stream
 */
function minifyCSS () {
	return less()
		.pipe( minify() )
		
		.pipe(
			gulp.dest(options.dest)
		);
}

// Register task
gulp.task('minify-css', minifyCSS);

// Register event handler
kickstarter.on('gulp.stage', minifyCSS);

// Export minify stream
module.exports = minifyCSS;