var _           = require('lodash');
var fastOptions = require('../options');

// Default options for less
var defaults = {
	dest: fastOptions.dest + '/css',
	webroot: fastOptions.webroot,
	autoprefix: [
		'Android >= 2.3',
		'Chrome >= 20',
		'Firefox >= 24',
		'Explorer >= 9',
		'iOS >= 6',
		'Opera >= 12',
		'Safari >= 6'
	]
}

// Export them options
module.exports = _.extend({}, defaults, fastOptions.less);