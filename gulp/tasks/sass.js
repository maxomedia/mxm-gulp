var gulp         = require('gulp');
var path         = require('path');
var fs           = require('fs');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var gutil        = require('gulp-util');
var merge        = require('merge-stream');
var options  = require('../options');
var plumber      = require('gulp-plumber');
var browserSync  = require('./browser-sync').server;
var errorHandler = require('../utils/errorHandler');

// Default plugin options
var sassOptions = options.sassOptions || {
	includePaths: ['node_modules'],
};
var autoprefixerOptions = options.autoprefixerOptions || {
	browsers: ['last 2 versions'],
}
var sourcemapOptions = options.sourcemapOptions || {
	sourceMappingURLPrefix: gulpOptions.webroot + '/css'
}

/**
 * Walk up the diretory tree to find some index.scss,
 * return the index.scss path or stop at the current
 * working directory and return null
 * 
 * @param {string} dir 
 * @returns {string} Index path or null
 */
function findIndex(dir) {
	if (dir == process.cwd()) return null;
	var files = fs.readdirSync(dir);
	var index = files.filter(function (file) {
		return file === 'index.scss';
	});
	if (!index.length) {
		findIndex(path.resolve(dir, '..'));
	} else {
		return path.resolve(dir, 'index.scss');
	}
}

/**
 * Compile the sass, handle errors, use autoprefixer
 * and write the sourcemap
 * @return {Stream} Gulp stream
 */
var compileSass = function (watchFile) {
	if (process.argv.indexOf('--production') > -1) {
		passedOpt.nodeSass.outputStyle = 'compressed';
	}

	// Cast to array, else the map will fail
	if (typeof options.main === 'string') {
		options.main = [options.main];
	}
	
	// Check for widget file
	var indexSrc = null;
	var indexDest = null;
	if (watchFile
	&& typeof watchFile === 'string'
	&& watchFile.indexOf('widgets') > -1) {
		// This is a widget file, only recomplie the index of the widget dir
		var dir = path.dirname(watchFile);
		var index = findIndex(dir);
		// If index found, only compile this package. Else, recompile
		// everything
		if (index) {
			indexSrc = [index];
			// Patch destination to widget folder
			indexDest = options.dest + '/' + dir.substring(dir.lastIndexOf('\\'), dir.length);
		}
	}
	
	// Create a gulp stream for every entry glob
	var tasks = options.entry.map(function (src) {
		return gulp.src(indexSrc || src)
			.pipe(plumber(errorHandler))
			.pipe(sourcemaps.init())
			.pipe(sass(sassOptions))
			.pipe(autoprefixer(autoprefixerOptions))
			.pipe(sourcemaps.write('/', sourcemapOptions))
			.pipe(gulp.dest(indexDest || options.dest))
	});

	// Merge all streams together
	return merge.apply(this, tasks).pipe(browserSync.stream({match: '**/*.css'}));
}

module.exports = compileSass;