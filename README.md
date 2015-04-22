# mxm-gulp
[![Build Status](https://travis-ci.org/maxomedia/mxm-gulp.svg?branch=develop)](https://travis-ci.org/maxomedia/mxm-gulp)

The buildsystem we use at maxomedia.

Most of the tasks and the structure are inspired by https://github.com/greypants/gulp-starter, thanks to all contributors of this repo.

#### Features
- [Less to CSS](https://github.com/plus3network/gulp-less) ([autoprefixed](https://github.com/sindresorhus/gulp-autoprefixer), [sourcemaps](https://github.com/floridoo/gulp-sourcemaps), [minified](https://github.com/jonathanepollack/gulp-minify-css/blob/master/package.json))
- JavaScript bundles with [webpack](https://github.com/webpack/webpack) (multiple bundles, sourcemaps, minified)
- [Jade to HTML](https://github.com/phated/gulp-jade)
- [Iconfont generation](https://github.com/backflip/gulp-iconfont-css) from .svg (with Less mixin and class references, [ttf, woff, svg, eot])
- [BrowserSync](https://github.com/BrowserSync/browser-sync)
- Build and reload on save
- Separate DEV and STAGE builds to speed up development
- Error logging with windows notification and in the console
- (Experimental es6 to es5 task with babel)

#### Prerequisites
You should know how to run gulp. If you are not familiar with it, here is a list of things you must have installed to use gulp.
- node.js (http://nodejs.org/)
- npm (https://www.npmjs.com/)
- gulp (http://gulpjs.com/)

#### Installation
1. Download the zip or clone the repository (mind the dot at the end of the command, if you want to clone to current     directory):
  ```shell
    $ git clone https://github.com/maxomedia/mxm-gulp.git .
  ```

2. Next, install the npm dependencies with:
  ```shell
    $ npm install
  ```

3.  Now's the time to set your options. You can find them under `gulpfile.js/options.js`. Be sure to set `dest` and `webroot` variables to your liking, these are the most important.

4.  To initially build your assets, create the folder structure and test the installation, run:
  ```shell
    $ gulp stage
  ```

5. If `gulp stage` finished without errors, you are good to go. Run `gulp` to start developing:
  ```shell
    $ gulp
  ```

#### Documentation
Please refer to the [wiki](https://github.com/maxomedia/mxm-gulp/wiki) of this repo for detailed information for each task.
