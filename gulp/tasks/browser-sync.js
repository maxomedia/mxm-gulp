var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var options     = require('../options').browserSync;

/**
 * Start browserSync with given options
 * @return {undefined}
 */
function startSyncing () {
	return browserSync.init(options);
}

// Export server
module.exports = {
	task: startSyncing,
	server: browserSync
}