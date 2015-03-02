var options = require('../options');

/**
 * Toggles dev tasks according to options file
 * @return {Array} List of dev tasks
 */
function getDevTasks () {
	var tasks = [];

	if (options.less && options.less.build) tasks.push('less');
	if (options.js && options.js.build) tasks.push('js');
	if (options.jade && options.jade.build) tasks.push('jade');
	if (options.iconfont && options.iconfont.build) tasks.push('iconfont');

	return tasks;
}

/**
 * Toggle staging tasks according to options file
 * @return {Array} List of staging tasks
 */
function getStageTasks () {
	var tasks = [];

	if (options.less && options.less.minify) tasks.push('minify-css');
	if (options.js && options.js.minify) tasks.push('minify-js');
	if (options.iconfont && options.iconfont.build) tasks.push('iconfont');

	return tasks;
}

/**
 * Toggle watch task for javascript
 * @return {Array} List of js watcher tasks (mostly just watchify or not)
 */
function getWatchifyTasks () {
	var tasks = [];

	if (options.js && options.js.build) tasks.push('watchify');

	return tasks;
}

/**
 * Export both functions
 * @type {Object}
 */
module.exports = {
	dev: getDevTasks,
	stage: getStageTasks
}