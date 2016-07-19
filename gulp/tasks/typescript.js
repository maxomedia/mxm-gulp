

var gulp = require('gulp');
var ts = require('gulp-typescript');
var watch        = require('gulp-watch');
var kickstarter = require('../utils/kickstarter');
var sourcemaps = require('gulp-sourcemaps');
var options = require('../options').typescript;

function compileTypescript(){

	 /*gulp.src(options.src)
        .pipe(sourcemaps.init())
        .pipe(ts())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(options.dest+".map")); */

	return gulp.src(options.src)
		.pipe(ts({
			"noImplicitAny" : true,
			"module": "commonjs",
			//"out" : './app-ts.js',
			//"outDir" :  "./js/compiled-ts/",			
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(options.dest));

} 
//gulp.task('default', compileTypescript);



/**
 * Watch ts files for changes
 * @return {Stream} Gulp stream
 */
var dev = function () {

	// Exit criteria
	if (!options) return;

	return watch(options.src, function () {
		gulp.start('typescript');
	});
}

// Register task
gulp.task('typescript', compileTypescript);
gulp.task('typescript:dev', dev);
gulp.task('typescript:stage', compileTypescript);


// Register event handler
kickstarter.on('gulp.dev', dev);
kickstarter.on('gulp.stage', function () {
	gulp.start('typescript');
});


// Export task
module.exports = compileTypescript;