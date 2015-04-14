// Many thanks to:
// https://github.com/greypants/gulp-starter


var gulp         = require('gulp');
var _            = require('lodash');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var logger       = require('../utils/bundleLogger');
var handleErrors = require('../utils/handleErrors');
var browserSync  = require('browser-sync');
var options      = require('../options').js;
var mergeStream  = require('merge-stream');
var getFilename  = require('../utils/filename');

function getFilename(path) {
	return path.replace(/^.*[\\\/]/, '');
}

var browserifyJS = function (dev) {

	var browserifyThis = function (config) {

		if (dev) {

			// Add watchify args and debug (sourcemaps) option
			_.extend (config, watchify.args, {debug: true}, options.browserifyOptions);

			// A watchify require/external bug that prevents proper recompiling,
			// so (for now) we'll ignore these options during development
			//config = _.omit(config, ['external', 'require'])
		}
		
		config.entries = config.src;

		var b = browserify(config);

		var bundle = function () {
			logger.start(config.name || config.src);

			return b
				.bundle()
				.on('error', handleErrors)
				.pipe(source(getFilename(config.src)))
				.pipe(gulp.dest(config.dest || options.dest))
				.on('end', report)
				.pipe(browserSync.reload({stream: true}));
		};

		if (dev) {
			b = watchify(b);
			b.on('update', bundle);
			logger.watch(config.src);
		} else {
			if (config.require) b.require(config.require);
			if (config.external) b.external(config.external);
		}

		var report = function () {
			logger.end( config.name || config.src );
		};

		return bundle();
	};

	return mergeStream.apply(gulp, _.map(options.bundles, browserifyThis));
};

gulp.task('browserify', function () {
	return browserifyJS();
});

module.exports = browserifyJS;