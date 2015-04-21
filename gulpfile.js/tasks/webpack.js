var gulp        = require('gulp');
var webpack     = require('webpack');
var browserSync = require('browser-sync');
var wpoptions   = require('../options').webpack;
var log         = require('../utils/compileLogger');

if (!wpoptions.plugins) wpoptions.plugins = [];
wpoptions.plugins.push(new webpack.optimize.CommonsChunkPlugin({
	name: 'shared',
	filename: '[name].js'
}));

gulp.task('webpack', function (callback) {
	var built = false;
	webpack(wpoptions, function (err, stats) {
		log(err, stats, 'webpack');
	}).watch(200, function (err, stats) {
		log(err, stats, 'webpack');
		browserSync.reload();
		if (!built) { built = true; callback(); }
	})
});