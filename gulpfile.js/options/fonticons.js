var _           = require('lodash');
var fastOptions = require('../options');

var defaults = {
	dest: fastOptions.dest + '/fonts',
	name: 'fonticons',
	class: 'gfx',
	template: 'gulpfile.js/utils/fonticons.less',
	rootPath: fastOptions.webroot + '/fonts/'
};

module.exports = _.extend({}, defaults, fastOptions.fonticons);