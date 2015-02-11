var assets = '../Assets'; // Relative to gulpfile.js
var webassets = '/project/media/Assets'; // Relative to webroot

module.exports = {

	// Project name
	name: 'mxm-gulp',

	// Less settings
	less: {
		src: 'less/**/*.less',
		main: 'less/main.less', // Comment out, if you want to pass the src glob
		dest: assets + '/css',
		suffix: '.min',
		autoprefix: [
			'Android >= 2.3',
			'Chrome >= 20',
			'Firefox >= 24', // Firefox 24 is the latest ESR
			'Explorer >= 8',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'
		],
		sourceMapRoot: webassets + '/css/' // Relative to web root
	},

	// Browserify settings
	js: {
		bundles: [
			{
				name: 'Header Scripts',
				src: 'js/header.js' // Relative to gulpfile.js
			},
			{
				name: 'Angular App',
				src: 'js/app.js' // Relative to gulpfile.js
			}
		],
		suffix: '.min',
		dest: assets
	},

	// Jade settings
	jade: {
		src: 'jade/**/*.jade', // Relative to gulpfile.js
		views: 'jade/views/**/*.jade', // Relative to gulpfile.js
		dest: '../Styleguide', // Relative to gulpfile.js
		minify: false
	},

	iconfont: {
		src: 'svg/**/*.svg', // Relative to gulpfile.js
		dest: assets + '/fonts',
		name: 'fonticons',
		class: 'gfx',
		template: 'gulp/utils/iconfont-template.less', // Relative to gulpfile.js
		lessDest: 'less/scaffolding/', // Relative to gulpfile.js
		rootPath: webassets + '/fonts/' // Relative to web root
	}
}