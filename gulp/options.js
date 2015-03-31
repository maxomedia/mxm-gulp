var assets = 'test'; // Relative to gulpfile.js
var webassets = '/project/media/Assets'; // Relative to webroot

module.exports = {

	// Project name
	name: 'mxm-gulp',

	// Less settings
	less: {
		build: true,
		minify: true,
		main: 'less/main.less',
		src: 'less/**/*.less',
		dest: assets + '/css',
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
		build: true,
		minify: true,
		bundles: [
			{
				name: 'App',
				src: './js/app.js' // Relative to gulpfile.js
			}
		],
		dest: assets + '/js',
		browserifyOptions: {
			noParse: [
				// require.resolve('jquery')
			]
		}
	},

	// Jade settings
	jade: {
		build: true,
		minify: false,
		src: 'jade/**/*.jade', // Relative to gulpfile.js
		views: 'jade/views/**/*.jade', // Relative to gulpfile.js
		dest: assets + '/html', // Relative to gulpfile.js
		locals: {} // Local variables to pass to the compiler
	},

	// Iconfont
	iconfont: {
		build: true,
		src: 'svg/**/*.svg', // Relative to gulpfile.js
		dest: assets + '/fonts',
		name: 'fonticons',
		class: 'gfx',
		template: 'gulp/utils/iconfont-template.less', // Relative to gulpfile.js
		lessDest: 'less/', // Relative to gulpfile.js
		rootPath: webassets + '/fonts/' // Relative to web root
	},

	browserSync: {
		active: true,
		server: {
			baseDir: 'test/html'
		}
	}
}