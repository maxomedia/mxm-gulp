# mxm-[gulp](https://github.com/gulpjs/gulp)
[![Build Status](https://travis-ci.org/maxomedia/mxm-gulp.svg?branch=develop)](https://travis-ci.org/maxomedia/mxm-gulp)
[![Inline docs](http://inch-ci.org/github/maxomedia/mxm-gulp.svg)](http://inch-ci.org/github/maxomedia/mxm-gulp)

The buildsystem we use at maxomedia.

Most of the tasks and the structure are inspired by https://github.com/greypants/gulp-starter, thanks to all contributors of this repo.

#### Features
- `gulp less` [Less to CSS](https://github.com/plus3network/gulp-less) ([autoprefixed](https://github.com/sindresorhus/gulp-autoprefixer), [sourcemaps](https://github.com/floridoo/gulp-sourcemaps), [minified](https://github.com/jonathanepollack/gulp-minify-css/))
- `gulp webpack` JavaScript bundles with [webpack](https://github.com/webpack/webpack) (multiple bundles, sourcemaps, minified)
- `gulp jade` [Jade to HTML](https://github.com/phated/gulp-jade)
- `gulp fonticons` [Iconfont generation](https://github.com/backflip/gulp-iconfont-css) from .svg (with Less mixin and class references, [ttf, woff, svg, eot])
- `gulp static` Task to copy static files to the destination folder
- `gulp bower` install bower dependencies
- `gulp tinypng` Minify any images (.png, .jpg) dropped at `src/tinypng`.
- [BrowserSync](https://github.com/BrowserSync/browser-sync)
- Build and reload on save
- Separate DEV and STAGE builds (`gulp` or `gulp dev` and `gulp stage`) to speed up development. Add `:dev` to any task to start it in dev mode or `:stage` for a production ready build. For example `gulp less:stage` for a minified build.
- Error logging with windows notification and in the console

#### Prerequisites
You should know how to run gulp. If you are not familiar with it, here is a list of things you must have installed in order to use gulp.
- node.js v4.1.2 (recommended) (http://nodejs.org/)
- npm v3.3.5 (recommended) (https://www.npmjs.com/)
- gulp (http://gulpjs.com/)

#### Planned features
- Find a way to avoid `gulp.start` in development environmet
- Get rid of the event system and use gulp dependencies instead
- Migrate to gulp 4.0 once it is released or prepeare already
- Reimplement JS testing

#### Installation
1. Download the zip and place its contents where you want to use them

2. Open a command prompt and navigate to the folder where gulpfile.js lies.

3. Next, install the npm dependencies. Type the following in your command prompt and hit enter:
  ```shell
    npm install
  ```

4.  Now's the time to set your options. You can find them under `gulp/options.js`. Be sure to set `destination` and `webroot` variables to your liking, these are the most important.

5.  To initially build your assets, create the folder structure and test the installation, run:
  ```shell
    gulp stage
  ```

6. If `gulp stage` finished without errors, you are good to go. Run `gulp` to start developing:
  ```shell
    gulp
  ```
  
  Your development files are stored at `/src`. The built assets will be stored at `/dist` by default.
  
If you work on windows and run into `node-gyp rebuild errors`, this pages might help resolve the issue. It can have many causes, here are a few listed with resources to help you resolve these issues:
 - python not installed or set in PATH (https://github.com/nodejs/node-v0.x-archive/issues/4047)
 - wrong Visual Studio version configured in node (http://stackoverflow.com/questions/14278417/cannot-install-node-modules-that-require-compilation-on-windows-7-x64-vs2012)

#### Documentation
Please refer to the [wiki](https://github.com/maxomedia/mxm-gulp/wiki) of this repo for detailed information for each task.
