var gulp    = require('gulp');
var options = require('../options').js;
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');

gulp.task( 'minify-js', ['browserify'], function() {
	return gulp.src( options.dest + '/**/*.js' )
		.pipe( uglify() )
		//.pipe( rename( { suffix: options.suffix } ) )
		.pipe( gulp.dest( options.dest ) );
});