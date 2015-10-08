# mxm-[gulp](https://github.com/gulpjs/gulp)
[![Build Status](https://travis-ci.org/maxomedia/mxm-gulp.svg?branch=develop)](https://travis-ci.org/maxomedia/mxm-gulp)

The buildsystem we use at maxomedia.

Most of the tasks and the structure are inspired by https://github.com/greypants/gulp-starter, thanks to all contributors of this repo.

#### Features
- `gulp less` [Less to CSS](https://github.com/plus3network/gulp-less) ([autoprefixed](https://github.com/sindresorhus/gulp-autoprefixer), [sourcemaps](https://github.com/floridoo/gulp-sourcemaps), [minified](https://github.com/jonathanepollack/gulp-minify-css/))
- `gulp webpack` JavaScript bundles with [webpack](https://github.com/webpack/webpack) (multiple bundles, sourcemaps, minified)
- `gulp jade` [Jade to HTML](https://github.com/phated/gulp-jade)
- `gulp fonticons` [Iconfont generation](https://github.com/backflip/gulp-iconfont-css) from .svg (with Less mixin and class references, [ttf, woff, svg, eot])
- `gulp static` Task to copy static files to the destination folder
- `gulp clean` Clean task to clean up all built assets
- `gulp bower` install bower dependencies
- `gulp karma` Test your javascripts with mocha
- `gulp tinypng` Minify any images (.png, .jpg) dropped at `src/tinypng`.
- [BrowserSync](https://github.com/BrowserSync/browser-sync)
- Build and reload on save
- Separate DEV and STAGE builds to speed up development
- Error logging with windows notification and in the console


#### Prerequisites
You should know how to run gulp. If you are not familiar with it, here is a list of things you must have installed in order to use gulp.
- node.js (http://nodejs.org/)
- npm (https://www.npmjs.com/)
- gulp (http://gulpjs.com/)

#### Installation
1. Download the zip and place its contents where you want to use them

2. Open a command prompt and navigate to the folder where gulpfile.js lies.

3. Next, install the npm dependencies. Type the following in your command prompt and hit enter:
  ```shell
    npm install
  ```

4.  Now's the time to set your options. You can find them under `gulpfile.js/options.js`. Be sure to set `destination` and `webroot` variables to your liking, these are the most important.

5.  To initially build your assets, create the folder structure and test the installation, run:
  ```shell
    gulp stage
  ```

6. If `gulp stage` finished without errors, you are good to go. Run `gulp` to start developing:
  ```shell
    gulp
  ```
  
  Your development files are stored at `/src`. The built assets will be stored at `/dist` by default.

#### Documentation
Please refer to the [wiki](https://github.com/maxomedia/mxm-gulp/wiki) of this repo for detailed information for each task.
