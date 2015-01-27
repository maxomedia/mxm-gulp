// ============
// Dependencies
// ============

var gulp    = require('gulp');
var jade    = require('gulp-jade');
var handleErrors = require('../utils/handleErrors');
var options = require('../options').jade;


// =====
// Tasks
// =====

gulp.task('jade', function () {

	// Define source files
	gulp.src( options.views )

	// Compile files
	.pipe( jade({pretty: !options.minify}).on('error', function (err){
		console.log(err);
	}))

	.on( 'error', handleErrors)

	// Save to destination
	.pipe( gulp.dest( options.dest ) );
});