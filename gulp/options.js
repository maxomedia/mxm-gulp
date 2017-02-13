var path = require('path');
var root = process.cwd();

/*
 *  Instructions:
 *  =============
 *
 *	1. All paths beneath are relative to gulpfile.js unless
 *	   a comment says otherwise.
 *
 *	2. If you don't want a task to be running,
 *	   comment out or delete its options.
 *
 *	3. Modify dest and webroot to your liking and you are good
 *	   to go.
 */

// Source files folder, root is where the command line is run
var source = 'src';

// Output folder for assets, relative to gulpfile.js
var destination = root + '/dist';

// Route to your asset folder from a browser point of view
var webroot = '';

var options = {

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

	webpack: {

		// Define where your javascript source files lie
		src: source + '/js/**/*.js',

		// Define entry points for your scripts.
		// Use paths starting with './' (this folder)
		// or '../' (this folders parent)
		entry: {
			app: './' + source + '/js/app.js'
		},

		// Set resolve paths
		resolve: {
			extensions: ['', '.js'],
			alias: { 
        src: path.resolve(root, source + '/js') 
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
		commonChunks: false,

		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['es2015']
					}
				}
			]
		},

		// For all other options, it is recommended you look
		// at the more detailed options file at /gulpfile.js/options/webpack.js
	},

	pug: {

		// Jade files to watch for changes
		src: source + '/pug/**/*.pug',

		// Destination for html files
		dest: destination + '/pug',

		// Entry points for views resulting in HTML pages
		views: source + '/pug/views/**/*.pug',

		// Options to pass to gulp-jade
		options: {
			pretty: true,
			basedir: root,
		}
	},

	// Handlebars to HTML
	handlebars: {

		// Jade files to watch for changes
		src: source + '/handlebars/**/*.hbs',
		data: source + '/data/**/*.json',

		// Destination for html files
		dest: destination,

		partials: source + '/handlebars/Partials/**/*.hbs',
		layout: source + '/handlebars/Shared/layout.hbs',

		// Entry points for views resulting in HTML pages
		views: source + '/handlebars/Views/**/*.hbs',
	},

	svgSprite: {
		src: source + '/svg/**/*.svg',
		dest: './',
		svgDest: source + '/handlebars/Partials/svg-sprite.svg',
		sassDest: source + '/sass/core/svg-sprite.scss',
		htmlDest: destination + '/svg-sprite.html',
		namespaceClassnames: false
	},

	static: {
		src: source + '/static/**'
	},

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
	src: source,
	root: root,
};

// Export them options
module.exports = options;
