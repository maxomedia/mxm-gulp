var gulp = require('gulp');
var spawn = require('child_process').spawn;
var async = require('async');
var index = require('serve-index');
var serve = require('gulp-serve');
var tap = require('gulp-tap');
var rimraf = require('rimraf');
var options = require('../options').galen;


var testCSS = function (callback) {
	var files = [];
	var galen = function (file, callback) {
		console.log(file.path, options.reports + '/' + file.relative.replace(/\.test/, ''));
		spawn('galen', [
			'test',
			file.path,
			'--htmlreport',
			options.reports + '/' + file.relative.replace(/\.test/, '')
		],
		{
			'stdio' : 'inherit'
		})
		.on('close', function () {
			callback();
		})
		.on('error', function (err) {
			console.log(err);
		});
	};

	gulp.src(options.tests)
		.pipe(tap(function (file) {
			files.push(file);
		}))
		.on('end', function () {
			async.mapSeries(files, function (file, finished) {
				galen(file, finished);
			}, function () {
				callback();
			});
		});
};

var serveReports = function () {
	serve({
		'middleware': function (req, res, next) {
			index(options.reports, {
				filter: false,
				hidden: true,
				icons: true,
				stylesheet: false,
				template: false,
				view: 'details'
			})(req, res, next);
		},
		port: options.port,
		root: options.reports
	});
};

// Register tasks
gulp.task('galen', testCSS);
gulp.task('serve-reports', ['galen'], serveReports);

// Export core functions
module.exports.galen = testCSS;
module.exports.serveReports = serveReports;