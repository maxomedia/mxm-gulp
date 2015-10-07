var gulp = require('gulp');
var options = require('../options').tinypng;
var handleErrors = require('../utils/handleErrors');
var tinypng = require('gulp-tinypng');

var gutil = require('gulp-util');
//var rimraf = require('gulp-rimraf');




//r options      = require('../options');
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');


var watcher;


function runTinyPNG(evt){
		//gutil.log("hello");

		return;

		var buff = [];
		for (var i in evt){
			buff.push("prop " + String(i));
		}
		return gutil.log(buff.join(", "));

		var fs = require("fs");
		var fileList = fs.readdirSync(options.src);

		return gutil.log(fileList.join(","));
		var fName = fileList.pop();
		if(fName.indexOf("done/") == 0){
			
			return gutil.log("skipping file " + fName);
		}

		var sourceFile = options.src + fName;
		var targFile = options.src + "done/" + fName;
		fs.renameSync(sourceFile,targFile)

		//var sourceFile = options.src+options.types;

	    return gulp.src(targFile)
        .pipe(tinypng(options.apikey))
        //.on( 'error', handleErrors)
        .pipe(gulp.dest(options.dest));
        //.on('end',cleanUpFiles);
}
function onChangeHandler(evt){
	console.log(evt.path + " "+ evt.type);

	if(evt.type == "added"){
		return gulp.src(evt.path)
        .pipe(tinypng(options.apikey))
        //.on( 'error', handleErrors)
        .pipe(gulp.dest(options.dest));

	}

}
/*
function cleanUpFiles(){
	
	
	
}*/





// Register task
gulp.task('tinypng', runTinyPNG);
gulp.task('tinypng:dev', function () {
	watcher = gulp.watch(options.src+options.types, ['tinypng']);
	watcher.on("change",onChangeHandler);
});

// Register event handler
kickstarter.on('gulp.dev', function () {
	gulp.start('tinypng:dev');
});
kickstarter.on('gulp.stage', function () {
	gulp.start('tinypng');
});

// Export task
module.exports = runTinyPNG;