var gulp        = require('gulp');
var path        = require('path');
var glob        = require('glob');
var webpack     = require('webpack');
var gutil       = require('gulp-util');
var browserSync = require('./browser-sync').server;
var options     = require('../options').js;
var rootOptions = require('../options');
var notify      = require('../utils/notify');

// Webpack for beginners:
// https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9

// Get entry object from glob array
var entryObject = {};
options.entry.map(function (entryPath) {
	glob.sync(entryPath).map(function (filePath) {
		var basename = path.basename(filePath);
		var filename = basename.substring(0, basename.lastIndexOf('.'));
		var pathParts = filePath.split('/');
		var parentFolder = pathParts[pathParts.length - 3];
		if (filePath.indexOf('widgets') >= 0) {
			entryObject[parentFolder + '/' + filename] = path.resolve(filePath);
		} else {
			var basename = path.basename(filePath);
			entryObject['/js/' + filename] = path.resolve(filePath);
		}
	});
});

var webpackOptions = {

	// Define entry points for your scripts.
	// Use paths starting with './' (this folder)
	// or '../' (this folders parent)
	entry: entryObject,

	// Set resolve paths
	resolve: {
		extensions: ['.js'],
		alias: { 
      src: path.resolve(rootOptions.root, rootOptions.src + '/js') 
    },
	},

	// Destination folder
	output: {
		filename: '[name].js',
		path: path.resolve(rootOptions.dest),
		publicPath: rootOptions.webroot,
	},

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
	plugins: [],
	bail: true,
	devtool: 'source-map',
};

/**
 * Start webpack and log errors to the console and with the error handler.
 * If there is an error, do not reload with browsersync.
 * @param  {Object}   options  Options for webpack
 * @param  {Function} callback Callback for gulp
 */
function pack (callback) {

	// Production or not?
	if (process.argv.indexOf('--production') > -1) {
		webpackOptions.plugins.push(new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
		}));
	}

	webpack(webpackOptions, function (err, stats) {

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