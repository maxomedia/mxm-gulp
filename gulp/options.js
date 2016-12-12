var path = require('path');

/*
 *  Instructions:
 *  =============
 *
 *	1. All paths beneath are relative to gulpfile.js unless
 *	   a comment says otherwise. If gulpfile.js is a folder,
 *	   think of it as a file, gulp treats it the same way.
 *
 *	2. If you don't want a task to be running,
 *	   comment out or delete its options.
 *
 *	3. Modify dest and webroot to your liking and you are good
 *	   to go, if your folder structure meets the defaults set.
 */

var source = 'src';

// Output folder for assets, relative to gulpfile.js
var destination = './dist';

// Route to your asset folder from a browser point of view
var webroot = '';

var options = {

	// All targeted files get simply copied to destination
	// folder.
	static: {
		src: source + '/static/**'
	},

	sass: {
		src: source + '/sass/**/*.scss',
		main: source + '/sass/main.scss',
		dest: destination + '/css',

		options: {
			nodeSass: {
				includePaths: ['node_modules'],
			},
			autoprefixer: {
				browsers: ['last 2 versions']
			},
			sourcemaps: {
				sourceMappingURLPrefix: webroot + '/css'
			}
		}
	},

	svgSprite: {
		src: source + '/svg/**/*.svg',
		dest: './',
		svgDest: destination + '/img/svg-sprite.svg',
		sassDest: source + '/sass/core/svg-sprite.scss',
		htmlDest: destination + '/svg-sprite.html',
		namespaceClassnames: false
	},

	// Javascript bundles
	webpack: {

		// Define where your javascript source files lie
		src: source + '/js/**/*.js',

		// Define entry points for your scripts.
		// Use paths starting with './' (this folder)
		// or '../' (this folders parent)
		entry: {
			app: source + '/js/app.js'
		},

		// Set resolve paths
		resolve: {
			extensions: ['', '.js'],
			root: path.resolve('./'),
			alias: {
				src: path.resolve(__dirname, source + '/js')
			},
		},

		// Use this if you load jquery over a cdn
		/*externals: {
		    'jquery': 'jQuery'
		},*/

		// Destination folder
		output: {
			path: destination + '/js/',
			publicPath: webroot
		},

		// Use common chunks plugin?
		commonChunks: false

		// For all other options, it is recommended you look
		// at the more detailed options file at /gulpfile.js/options/webpack.js
	},

	// Jade to HTML
	pug: {

		// Jade files to watch for changes
		src: source + '/pug/**/*.pug',

		// Destination for html files
		dest: destination,

		// Entry points for views resulting in HTML pages
		views: source + '/pug/views/**/*.pug',

		// Options to pass to gulp-jade
		options: {
			pretty: true
		}
	},

	// Static webserver and livereload
	browserSync: {

		// If you have static html, css and js files and no server,
		// you can use browserSync as your static file server:
		server: { baseDir: destination },

		// If you already have a server running,
		// you can use browserSync as a proxy, like:
		// proxy: 'localhost:60000'

		// Wether to open new tab on start or not
		open: true,
		logFileChanges: false
	},

	// These are required for the
	// extended options, do not alter
	dest: destination,
	webroot: webroot,
	src: source
};

// Export them options
module.exports = options;
