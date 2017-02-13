var gulp         = require('gulp');
var hb           = require('gulp-hb');
var hbLayouts    = require('handlebars-layouts');
var browserSync  = require('browser-sync');
var rename       = require('gulp-rename');
var gutil        = require('gulp-util');
var options      = require('../options').handlebars;
var handleErrors = require('../utils/errorHandler');

function compileHandlebars () {
	// Exit criteria
	if (!options) return;
	
	var hbStream = hb()
	.partials(options.layout)
	.partials(options.partials)
	.helpers(hbLayouts)
	.data(options.data);	
	// Define source files
	return gulp.src( options.views )

	// Compile files
	.pipe(hbStream)
	.pipe(rename({
		extname: '.html',
	}))
	// Handle them errors

	// Save to destination
	.pipe( gulp.dest( options.dest ) )

	// Reolad page
	.pipe(browserSync.reload({stream: true}));
}

module.exports = compileHandlebars;