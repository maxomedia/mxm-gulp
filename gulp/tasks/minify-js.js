var gulp    = require('gulp');
var options = require('../options').js;
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var filename = require('../utils/filename');

gulp.task( 'minify-js', ['browserify'], function() {

	// Only minify bundled scripts
	var files = [];
	for (var i = 0; i < options.bundles.length; i++) {
		files.push(options.dest + '/' + filename(options.bundles[i].src));
	}

	return gulp.src(files)
		.pipe(uglify())
		.pipe(gulp.dest(options.dest));
});