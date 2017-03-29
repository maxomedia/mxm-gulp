var gulp        = require('gulp');
var path        = require('path');
var webpack     = require('webpack');
var gutil       = require('gulp-util');
var deepAssign  = require('deep-assign');
var browserSync = require('./browser-sync').server;
var gulpOptions = require('../options');
var notify      = require('../utils/notify');

var defaultOptions = {

	// Define where your javascript source files lie
	src: gulpOptions.src + '/js/**/*.js',

	// Define entry points for your scripts.
	// Use paths starting with './' (this folder)
	// or '../' (this folders parent)
	entry: {
		app: './' + gulpOptions.src + '/js/app.js'
	},

	// Set resolve paths
	resolve: {
		extensions: ['', '.js'],
		alias: { 
      src: path.resolve(gulpOptions.root, gulpOptions.src + '/js') 
    },
	},

	// Destination folder
	output: {
		path: gulpOptions.dest + '/js/',
		publicPath: gulpOptions.webroot
	},

	// Use common chunks plugin?
	commonChunks: false,

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			}
		]
	},
};
var options = deepAssign(defaultOptions, gulpOptions.webpack);

// Set shared options
options.plugins = options.plugins || [];
options.output.filename = options.output.filename || '[name].js';
options.bail = true;
options.devtool = 'source-map';

/**
 * Start webpack and log errors to the console and with the error handler.
 * If there is an error, do not reload with browsersync.
 * @param  {Object}   options  Options for webpack
 * @param  {Function} callback Callback for gulp
 */
function pack (callback) {

	// Common chunks
	if (options.commonChunks) {
		options.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: 'shared',
			filename: '[name].js'
		}));
	}

	// Production or not?
	if (process.argv.indexOf('--production') > -1) {
		options.plugins.push(new webpack.optimize.UglifyJsPlugin());
	} else {
		webpack.debug = true;
	}

	webpack(options, function (err, stats) {

		if (err) {

			// Log errors
			gutil.log(gutil.colors.red(err.message));
			if (process.argv.indexOf('--production') < 0) {
        notify(err);
      }
		} else {

			// Reload page
			browserSync.reload();
		}

		// Finished, with or without errors
		callback();
	});
}

// Export tasks
module.exports = pack;