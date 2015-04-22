/*
 *  Instructions:
 *  =============
 *  
 *	1. All paths beneath are relative to gulpfile.js unless
 *	   a comment says otherwise. If gulpfile.js is a folder,
 *	   think of it being a file, gulp treats it the same way.
 *	   
 *	2. If you don't want a task to be running,
 *	   comment his options out.
 *	   
 *	3. Modify dest and webroot to your liking and you are good
 *	   to go, if your folder structure meets the defaults set.
 */

// [relative to gulpfile.js]
var dest = './dest';

// [relative to webroot]
var webroot = '';

var options = {
	name: 'mxm-gulp',

	less: {

		// [optional] Entry point
		main: 'less/main.less',

		// Files to watch for changes
		src: 'less/**/*.less',

		// Autoprefixer options, see https://www.npmjs.com/package/gulp-autoprefixer
		// autoprefix: ['last 2 versions']
	},

	webpack: {

		// Define entry points for your scripts
		entry: {
			app: './js/app.js',
			module: './js/module.js'
		}
	},

	jade: {

		// Jade files to watch for changes
		src: 'jade/**/*.jade',

		// Entry points for actual pages
		views: 'jade/views/**/*.jade',

		// Destination for html files
		dest: dest,

		// Local variables to pass to the compiler
		//locals: {}
	},

	fonticons: {

		// SVG files to watch for changes
		src: 'svg/**/*.svg',

		// Destination for the less files containing the mixin
		lessDest: 'less/core/',

		// [relative to webroot] Path to use in @fontface rule
		rootPath: webroot + '/fonts/'
	},

	browserSync: {

		// If you have static html, css and js files and no server,
		// you can use browserSync as your static file server:
		server: { baseDir: dest },

		// If you already have a server running,
		// you can use browserSync as a proxy, like:
		// proxy: 'localhost:60000'
	},

	// These are required for the 
	// extended options
	dest: dest,
	webroot: webroot	
};

// Export them options
module.exports = options;