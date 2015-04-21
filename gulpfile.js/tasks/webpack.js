var gulp         = require('gulp');
var _            = require('lodash');
var webpack = require('webpack');
//var logger       = require('../utils/handleErrors');
var logger       = require('../utils/compileLogger');
var prettifyTime       = require('../utils/prettifyTime');
var browserSync  = require('browser-sync');
var wpoptions = require('../options').webpack;
var gutil  = require('gulp-util');

if (!wpoptions.plugins) wpoptions.plugins = [];

wpoptions.plugins.push(new webpack.optimize.CommonsChunkPlugin({
	name: 'shared',
	filename: '[name].js'
}));

function log (err, stats) {
	if (err) {
		if (err) gutil.log(gutil.colors.red(err));
	} else {
		gutil.log(
			'Finished',
			gutil.colors.cyan('\'webpack\''),
			'after',
			gutil.colors.magenta(prettifyTime(stats.endTime - stats.startTime))
		);
	}
}

gulp.task('webpack', function (callback) {
	var built = false;
	webpack(wpoptions, function (err, stats) {
		log(err, stats);
	}).watch(200, function (err, stats) {
		log(err, stats);
		browserSync.reload();
		if (!built) { built = true; callback(); }
	})
});