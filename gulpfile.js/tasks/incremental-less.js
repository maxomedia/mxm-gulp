var gulp          = require('gulp');
var less          = require('gulp-less');
var concat        = require('gulp-concat');
var cached        = require('gulp-cached');
var progeny       = require('gulp-progeny');
var remember      = require('gulp-remember');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var options       = require('../options/less');
var browserSync   = require('browser-sync');
var watch         = require('gulp-watch');
var compileLogger = require('../utils/compileLogger');
var filelog = require('gulp-filelog');

function build (callback) {
	return gulp.src(options.src)
		
		// Add new files to cache
		.pipe(cached('less'))
		.pipe(progeny({
            regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
        }))
		.pipe(filelog())
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', function (err) { console.log(err); })
		.pipe(remember('less'))
		.pipe(autoprefixer())
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(options.dest))
		.on('end', callback)

		// Reload page with browsersync
		.pipe(browserSync.reload({stream: true}))
}

gulp.task('incremental-less', function (callback) {
	build(callback);
});

gulp.task('incremental-less:watch', function (callback) {
	var callbacked = false;
	var watcher = watch(options.src, function (file) {

		if (typeof handleChanges[file.event] === 'function'){
			handleChanges[file.event](file);
		}
		var stats = { startTime: new Date() };
		build(function () {

			stats.endTime = new Date();
			compileLogger(null, stats, 'incremental-less');
			if (!callbacked) callback();
			callbacked = true;
		});
	});
	watcher.on('change', watcher_change);
});

function watcher_change (event) {

}

var handleChanges = {
	change: function (file) {

		console.log('hc change');
	},
	unlink: function (file) {
		console.log(file.path);
		console.log(JSON.stringify(cached.caches.less[file.path]));
		console.log(remember.cacheFor('less'));
		delete cached.caches['less'][file.path];
		remember.forget('less', file.path.substr(0, file.path.lastIndexOf('.')) + '.css');
	},
	add: function (file) {
		console.log('hc add');
	}
};
function change (e) {
	console.log('watcher ' + e.type);
	if (e.type === 'deleted') {
	}
}