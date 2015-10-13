var notify = require("gulp-notify");
var notifier = require('node-notifier');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function(errorObject, callback) {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') this.emit('end');
};

// TODO: use this function instead of the ugly one above
function logError (err) {

	// Windows Balloon, growl or toast notification popup
	notifier.notify({
		title: err.title,
		message: err.message,
		icon: path.join(__dirname, 'gulp.png')
	});

	// Log to the console
	gutil.log(err.title + '\n' + gutil.colors.red(err.message));
}