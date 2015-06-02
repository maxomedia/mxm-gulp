var gutil        = require("gulp-util");
var prettifyTime = require('./prettifyTime');

module.exports = function(err, stats, taskName) {
	if(err) throw new gutil.PluginError("webpack", err);

	gutil.log(
		'Finished \'',
		gutil.colors.cyan(taskName),
		'\' after',
		gutil.colors.magenta(prettifyTime(stats.endTime - stats.startTime))
	);
};