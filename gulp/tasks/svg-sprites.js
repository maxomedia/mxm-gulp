var gulp         = require('gulp');
var svgSprite    = require('gulp-svg-sprite');
var watch        = require('gulp-watch');
var options      = require('../options').svgSprite;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Create svg sprite with less classes for dimensions
 * and a html demo page with a list of all icons
 * @return {Stream} Gulp stream
 */
var createSprite = function () {
	return gulp.src(options.src)
		.pipe(svgSprite({
			mode: {				
				symbol: {
					dest: './',
					inline: true,
					sprite: options.svgDest,
					render: {
						less: {
							dest: options.lessDest
						}
					},
					prefix: '.gfx-%s',
					example: {
						dest: options.htmlDest
					},
					bust: false
				}
			}
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest(options.dest));
}

/**
 * Watch svg files for changes
 * @return {Stream} Gulp stream
 */
var dev = function () {

	// Exit criteria
	if (!options) return;

	return watch(options.src, function () {
		gulp.start('svg-sprite');
	});
}

// Register task
gulp.task('svg-sprite', createSprite);
gulp.task('svg-sprite:dev', dev);
gulp.task('svg-sprite:stage', createSprite);

// Register event handler
kickstarter.on('gulp.dev', dev);
kickstarter.on('gulp.stage', function () {
	gulp.start('svg-sprite');
});

// Export task
module.exports = createSprite;