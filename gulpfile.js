/*
	gulpfile.js
	===========
	Rather than manage one giant configuration file responsible
	for creating multiple tasks, each task has been broken out into
	its own file in /tasks. Any file in that folder gets automatically
	required by the loop.

	To add a new task, simply add a new task file to /tasks.

	SOURCE: https://github.com/greypants/gulp-starter
*/

var fs = require('fs');
var onlyScripts = require('./gulp/utils/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task){
	require('./gulp/tasks/' + task);
});