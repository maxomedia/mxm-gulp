var gulp         = require('gulp');
var svgSprite    = require('gulp-svg-sprite');
var plumber      = require('gulp-plumber');
var browserSync  = require('./browser-sync').server;
var options      = require('../options').svgSprite;
var errorHandler = require('../utils/errorHandler');

/**
 * Create svg sprite with less classes for dimensions
 * and a html demo page with a list of all icons
 * @return {Stream} Gulp stream
 */
var createSprite = function () {
	if (!options) return;

	return gulp.src(options.src)
		.pipe(plumber(errorHandler))
		.pipe(svgSprite({
			cssFile: options.sassDest,
			mode: {				
				symbol: {
					dest: './',
					inline: true,
					sprite: options.svgDest,
					render: {
						scss: {
							dest: options.sassDest
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
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream());
}

// Export task
module.exports = createSprite;