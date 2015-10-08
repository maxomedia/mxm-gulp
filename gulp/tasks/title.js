var exec    = require('child_process').exec;
var options = require('../options');
var kickstarter = require('../utils/kickstarter');

/**
 * Set the title of the console window
 */
function setTitle () {
	exec('title ' + options.name);
}

// Register event handler
kickstarter.on('gulp.dev', setTitle);

// Export task
module.exports = setTitle;