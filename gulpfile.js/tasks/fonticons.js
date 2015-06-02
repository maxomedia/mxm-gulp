var gulp         = require('gulp');
var fonticons    = require('gulp-iconfont');
var consolidate  = require('gulp-consolidate');
var options      = require('../options/fonticons');
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Generate font files from svg icons
 * @return {Object} Gulp stream
 */
function generateFonticons () {

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

	// Handle errors
	.on('error', handleErrors)

	// Save the fonticons
	.pipe(gulp.dest(options.dest));
}

/**
 * Generate .less file with a mixin and 
 * convenience classes for every icon.
 * @param {Object} codepoints [description]
 */
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

		// Handle errors
		.on('error', handleErrors)

		// Save the less file
		.pipe( gulp.dest(options.lessDest) )

		.on('end', function () {
			kickstarter.emit('fonticons.end');
		});
}

// Register task
gulp.task('fonticons', generateFonticons);

// Register event handlers
kickstarter.on('gulp.dev', function () {
	gulp.watch(options.src, ['fonticons']);
});
kickstarter.on('gulp.stage', function () {
	gulp.start('fonticons');
});

// Export stream
module.exports = generateFonticons;