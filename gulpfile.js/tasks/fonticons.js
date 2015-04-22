// Dependencies
// ============

var consolidate  = require('gulp-consolidate');
var gulp         = require('gulp');
var fonticons    = require('gulp-iconfont');
var handleErrors = require('../utils/handleErrors');
var options      = require('../options/fonticons');


gulp.task('fonticons', function (){

	// Get the icons
	return gulp.src(options.src)

	// Create fonticons
	.pipe( fonticons({
		fontName: options.name,
		normalize: true,
		appendCodepoints: true
	}))

	// On parsing one icon, create .less file
	.on('codepoints', setCodepoints)

	.on('error', handleErrors)

	// Save the fonticons
	.pipe(gulp.dest(options.dest));
});

function setCodepoints (codepoints) {

	// Get less template
	gulp.src(options.template)

		// Create less file
		.pipe( consolidate('lodash', {
			glyphs: codepoints,
			fontName: options.name,
			fontPath: options.rootPath,
			className: options.class
		}))

		.on('error', handleErrors)

		// Save the less file
		.pipe( gulp.dest(options.lessDest) );
}