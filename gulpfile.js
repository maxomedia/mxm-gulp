/*
	gulpfile.js
	===========
	Rather than manage one giant configuration file responsible
	for creating multiple tasks, each task has been broken out into
	its own file in gulpfile.js/tasks. Any files in that directory get
	automatically required below.
	To add a new task, simply add a new task file that directory.
	gulpfile.js/tasks/default.js specifies the default set of tasks to run
	when you run `gulp`.

	SOURCE: https://github.com/greypants/gulp-starter
*/

var cp = require('child_process');
var options = require('./gulp/options');
var pugTask = require('./gulp/tasks/pug');

cp.exec(options.name);

// var requireDir = require('require-dir');
// requireDir('./gulp/tasks', {recurse: true});