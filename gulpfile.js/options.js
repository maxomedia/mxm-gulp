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

// [relative to gulpfile.js]
var dest = './dest';

// [relative to webroot]
var webroot = '';

var options = {
	name: 'mxm-gulp',

	less: {
		
		// Use experimental incremental build
		// Files are added automatically and in
		// random order. Every file must import
		// its reference dependencies
		incremental: false,

		// Exclude condition for incremental builds.
		// Pass a '!exclude.less' style path.
		exclude: ['!core/*'],

		// Entry point if you don't use incremental less
		// This can be an array of files for multiple
		// bundles
		main: 'src/less/main.less',

		// Files to watch for changes and glob used
		// for incremental less build
		src: 'src/less/**/*.less',

		// Autoprefixer options, see https://www.npmjs.com/package/gulp-autoprefixer
		// autoprefixer: {browsers: ['last 2 versions']}
	},

	webpack: {

		// Define entry points for your scripts
		entry: {
			app: 'src/js/app.js'
		}
	},

	jade: {

		// Jade files to watch for changes
		src: 'src/jade/**/*.jade',

		// Entry points for actual pages
		views: 'src/jade/views/**/*.jade',

		// Destination for html files
		dest: dest,

		// Local variables to pass to the compiler
		//locals: {}
	},

	fonticons: {

		// SVG files to watch for changes
		src: 'src/svg/**/*.svg',

		// Destination for the less files containing the mixin
		lessDest: 'src/less/core/',

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