var path = require('path');
var root = process.cwd();

/*
 *	1. All paths beneath are relative to gulpfile.js unless
 *	   a comment says otherwise.
 *
 *	2. Modify the paths to your liking and you are good
 *	   to go.
 *
 * 	3. npm run start
 * 	
 * 	4. Profit.
 */

// Frontend folder
var source = 'Frontend';

// Output folder for assets, relative to gulpfile.js
var destination = 'Assets';

// Route to your asset folder from a browser point of view
var webroot = '';

// Per task options
var options = {
	sass: {
		src: source + '/sass/**/*.scss',
		main: source + '/sass/main.scss',
	},

	webpack: {
		src: source + '/js/**/*.js',

		// Define entry points for your scripts.
		// Use paths starting with './' (this folder)
		// or '../' (this folders parent)
		entry: {
			app: './' + source + '/js/app.js'
		},

		// Define globals if you use CDN scripts
		/*externals: {
		    'jquery': 'jQuery'
		},*/

		// Use common chunks plugin?
		// If you are using multiple bundles, this plugin can
		// identify modules used by all bundles and it places them in a separate
		// script 'shared.js', so those common modules are not duplicated in all bundles.
		// The shared.js needs to be loaded before all other bundles.
		commonChunks: false,
	},

	// Handlebars to HTML
	handlebars: {

		// Jade files to watch for changes
		src: [source + '/handlebars/**/*.hbs', source + '/data/**/*.json'],
		data: source + '/data/**/*.json',

		// Destination for html files
		dest: destination,

		partials: source + '/handlebars/Partials/**/*.hbs',
		layout: source + '/handlebars/Shared/layout.hbs',

		// Entry points for views resulting in HTML pages
		views: source + '/handlebars/Views/**/*.hbs',
	},

	svgSprite: {
		src: source + '/svgsprite/**/*.svg',
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
