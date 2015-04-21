// All paths beneath are relative to gulpfile.js unless
// a comment says otherwise

// [relative to gulpfile.js]
var assets = './dest';

// [relative to webroot]
var webroot = '/project/media/Assets';

// If you don't want a task to be running,
// comment his options out
module.exports = {

	// Project name
	name: 'mxm-gulp',

	less: {
		
		// [optional] Entry point
		main: 'less/main.less',

		// Files to watch for changes
		src: 'less/**/*.less',

		// CSS destination
		dest: assets + '/css',

		// Autoprefixer options, see https://www.npmjs.com/package/gulp-autoprefixer
		// autoprefix: ['last 2 versions']
	},

	js: {

		src: [
			'./js/app.js',
			'./js/module.js'
		],

		// Your bundles
		bundles: [
			// Entry point of the bundle, dest is optional
			{ src: './js/app.js', /*dest: '/xy'*/ }
		],

		// Default destination for bundled scripts
		dest: assets + '/js',

		// Options for gulp-uglify, see https://www.npmjs.com/package/gulp-uglify
		uglifyOptions: { /* uglify options */ },

		// Options for browserify, see https://www.npmjs.com/package/browserify
		browserifyOptions: { /*noParse: [ require.resolve('jquery') ]*/ }
	},

	/*es6: {
		src: './es6/app.js',
		dest: assets + '/es6'
	},*/

	jade: {

		// Jade files to watch for changes
		src: 'jade/**/*.jade',

		// Entry points for actual pages
		views: 'jade/views/**/*.jade',

		// Destination for html files
		dest: assets,

		// Local variables to pass to the compiler
		locals: {}
	},

	iconfont: {

		// SVG files to watch for changes
		src: 'svg/**/*.svg',

		// Destinations for font files (.eot, .ttf, .woff, .svg)
		dest: assets + '/fonts',

		// Destination for the less files containing the mixin
		lessDest: 'less/',

		// [relative to webroot] Path to use in @fontface rule
		rootPath: webroot + '/fonts/'
	},

	browserSync: {

		// If you have static html, css and js files and no server,
		// you can use browserSync as your static file server:
		server: { baseDir: assets },

		// If you already have a server running,
		// you can use browserSync as a proxy, like:
		// proxy: 'localhost:60000'
	},

	webpack: {
		entry: {
			app: './js/app.js',
			module: './js/module.js'
		},
		output: {
			path: assets + '/js/',
			filename: '[name].js'
		},
		debug: true,
		devtool: '#source-map',
		resolve: {
			extensions: ['', '.js']
		}
	}
}