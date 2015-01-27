// Many thanks to:
// https://github.com/greypants/gulp-starter


var gulp         = require('gulp');
var _            = require('lodash');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var logger       = require('../utils/bundleLogger');
var handleErrors = require('../utils/handleErrors');
var options      = require('../options').js;


var browserifyJS = function(callback, dev) {

	var queue = options.bundles.length;

	var browserifyThis = function(config) {

		if (dev) {

			// Add watchify args and debug (sourcemaps) option
			_.extend (config, watchify.args, {debug: true});

			// A watchify require/external bug that prevents proper recompiling,
			// so (for now) we'll ignore these options during development
			//config = _.omit( config, ['external', 'require'])
		}

		config.entries = './' + config.src;

		var b = browserify( config );

		var bundle = function () {
			logger.start( config.name || config.src );

			return b
				.bundle()
				.on( 'error', handleErrors )
				.pipe( source( config.src ) )
				.pipe( gulp.dest( config.dest || options.dest ))
				.on( 'end', report );
		};

		if (dev) {
			b = watchify( b );
			b.on( 'update', bundle );
			logger.watch( config.name || config.src );
		} else {
			if ( config.require ) b.require( config.require );
			if ( config.external ) b.external( config.external );
		}

		var report = function () {
			logger.end( config.name || config.src )

			if (queue) {
				queue--;
				if (queue === 0)  callback();
			}
		};

		return bundle();
	};

	options.bundles.forEach( browserifyThis );
};

gulp.task( 'browserify', browserifyJS );

module.exports = browserifyJS;