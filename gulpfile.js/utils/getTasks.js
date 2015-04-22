var options = require('../options');

/**
 * Toggles dev tasks according to options file
 * @return {Array} List of dev tasks
 */
function getDevTasks () {
	var tasks = [];

	if (options.less) tasks.push('less');
	if (options.jade) tasks.push('jade');
	if (options.fonticons) tasks.push('fonticons');
	if (options.es6) tasks.push('es6');

	return tasks;
}

/**
 * Toggle staging tasks according to options file
 * @return {Array} List of staging tasks
 */
function getStageTasks () {
	var tasks = [];

	if (options.less) tasks.push('minify-css');
	if (options.webpack) tasks.push('webpack:stage');
	if (options.jade) tasks.push('jade');
	if (options.fonticons) tasks.push('fonticons');
	if (options.es6) tasks.push('es6');

	return tasks;
}

function getWatchTasks () {
	var tasks = [];

	if (options.browserSync) tasks.push('browserSync');
	if (options.webpack) tasks.push('webpack:watch');

	return tasks;
}

/**
 * Export both functions
 * @type {Object}
 */
module.exports = {
	dev: getDevTasks,
	stage: getStageTasks,
	watch: getWatchTasks
}