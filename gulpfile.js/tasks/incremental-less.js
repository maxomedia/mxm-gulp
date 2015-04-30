var gulp                 = require('gulp');
var less                 = require('gulp-less');
var concat               = require('gulp-concat');
var cached               = require('gulp-cached');
var progeny              = require('gulp-progeny');
var remember             = require('gulp-remember');
var sourcemaps           = require('gulp-sourcemaps');
var autoprefixer         = require('gulp-autoprefixer');
var options              = require('../options/less');
var browserSync          = require('browser-sync');

// Build task
gulp.task('incremental-less', function () {

	return gulp.src(options.src)

		// Add new files to cache
		.pipe(cached('less'))
		.pipe(progeny({
            regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
        }))
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', function (err) { console.log(err); })
		.pipe(remember('css'))
		.pipe(autoprefixer())
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(options.dest))

		// Reload page with browsersync
		.pipe(browserSync.reload({stream: true}));
});

function change (e) {
	console.log('watcher ' + e.type);
	if (e.type === 'deleted') {
		delete cached.caches.scripts[e.path];
		remember.forget('css', e.path);
	}
}