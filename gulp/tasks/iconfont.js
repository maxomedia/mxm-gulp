// Dependencies
// ============

var consolidate = require('gulp-consolidate');
var gulp        = require('gulp');
var iconfont    = require('gulp-iconfont');
var rename      = require('gulp-rename');
var handleErrors = require('../utils/handleErrors');
var options     = require('../options').iconfont;


// Tasks
// =====

gulp.task('iconfont', buildIconfont);


// Functions
// =========

function buildIconfont(){
	
	// Get the icons
	return gulp.src(options.src)

	// Create iconfont
	.pipe( iconfont({
		fontName: options.name,
		//fixedWidth: false,
		//centerHorizontally: false,
		normalize: true,
		//fontHeight: 512,
		//descent: 1,
		appendCodepoints: true
	}))

	// On parsing one icon, create .less file
	.on('codepoints', function(codepoints){

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

		// Rename the file
		.pipe( rename(options.name + '.less') )

		// Save the less file
		.pipe( gulp.dest(options.lessDest) );
	})

	.on('error', handleErrors)

	// Save the iconfont
	.pipe(gulp.dest(options.dest));
}