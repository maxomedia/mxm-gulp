var gulp         = require('gulp');
var watch        = require('gulp-watch');
var gutil        = require('gulp-util');
var fonticons    = require('gulp-iconfont');
var consolidate  = require('gulp-consolidate');
var options      = require('../options').fonticons;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Generate font files from svg icons
 * @return {Object} Gulp stream
 */
function generateFonticons () {

	if (!options) return;

	// Get the icons
	return gulp.src(options.src)

	// Create fonticons
	.pipe( fonticons({
		fontName: 'fonticons',
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
	gulp.src('gulpfile.js/utils/fonticons.less')

		// Create less file
		.pipe( consolidate('lodash', {
			glyphs: codepoints,
			fontName: 'fonticons',
			fontPath: options.root,
			className: 'gfx'
		}))

		// Handle errors
		.on('error', handleErrors)

		// Save the less file
		.pipe( gulp.dest(options.lessDest) )

		.on('end', function () {
			kickstarter.emit('fonticons.end');
		});
}

function dev () {
	if (!options) return;

	watch(options.src, function () {
		gulp.start('fonticons');
	});
}

// Register task
gulp.task('fonticons', generateFonticons);
gulp.task('fonticons:dev', dev);
gulp.task('fonticons:stage', generateFonticons);

// Register event handlers
kickstarter.on('gulp.dev', dev);
// Staging fonticon event is handled in less task

// Export stream
module.exports = generateFonticons;