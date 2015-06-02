var _           = require('lodash');
var fastOptions = require('../options');

// Default options for less
var defaults = {
	incremental: false,
	exclude: ['!core/*'],
	dest: fastOptions.dest + '/css',
	webroot: fastOptions.webroot,
	autoprefixer: {
		browsers: [
			'Android >= 2.3',
			'Chrome >= 20',
			'Firefox >= 24',
			'Explorer >= 9',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'
		]
	}
}

var options = _.extend({}, defaults, fastOptions.less || fastOptions.incrementalLess);

options.exclude.push(options.src);

// Export them options
module.exports = options;