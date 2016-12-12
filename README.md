# mxm-[gulp](https://github.com/gulpjs/gulp)
[![Build Status](https://travis-ci.org/maxomedia/mxm-gulp.svg?branch=develop)](https://travis-ci.org/maxomedia/mxm-gulp)
[![Inline docs](http://inch-ci.org/github/maxomedia/mxm-gulp.svg?branch=develop)](http://inch-ci.org/github/maxomedia/mxm-gulp)

The buildsystem we use at maxomedia.

Most of the tasks and the structure are inspired by https://github.com/greypants/gulp-starter, thanks to all contributors of this repo.

#### Features
- `gulp`
  - Watch files and start local dev server (port and other info is logged to the console)
- `gulp build`
  - Build all files once (fast build, not minified)
- `gulp sass` [SCSS to CSS](https://github.com/dlmanning/gulp-sass)
  - [Autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
  - [Sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
  - Run `gulp sass --production` for minified CSS
- `gulp webpack` JavaScript bundles with [webpack](https://github.com/webpack/webpack)
  - ES6 to ES5 (stage 3 babel transpiler)
  - multiple bundles
  - sourcemaps
  - minified
  - CommonJS
  - Run `gulp webpack --production` for minified JS
- `gulp pug` [Pug to HTML](https://github.com/pugjs/gulp-pug)
- `gulp svg-sprite` to concat svg files
  - concatenated svg file
  - create a Scss with dimension info
  - a demo HTML page
- `gulp static` Task to copy static files to the destination folder, e.g. fonts or images
- [BrowserSync](https://github.com/BrowserSync/browser-sync)
  - Livereload on save
  - Mind the settings at `localhost:3001` for input syncing and weinre remote debugger
- Use the `--production` flag if you want minified files
  - Build everything minified and ready: `gulp build --production`
  - Watch files and start local dev server: `gulp`
- Error logging with system notifications and in the console
- There are the following npm scripts available if you don't want to install gulp globally
  - `npm run gulp` -> `gulp`
  - `npm run build` -> `gulp build`
  - `npm run watch` -> `gulp watch`

#### Prerequisites
You should know how to run gulp. If you are not familiar with it, here is a list of things you must have installed in order to use gulp.
- node.js v6+ (recommended) (http://nodejs.org/)
- npm v3+ (recommended) (https://www.npmjs.com/)
- gulp v3.9+ (http://gulpjs.com/)

#### Planned features
- Migrate to gulp 4.0 once it is released
- Reimplement JS testing
- Generated styleguides with hologram or similar

#### Installation
1. Download the zip and place its contents where you want to use them

2. Open a command prompt and navigate to the folder where gulpfile.js lies.

3. Next, install the npm dependencies. Type the following in your command prompt and hit enter:
  ```bash
    npm install
  ```

4.  Now's the time to set your options. You can find them under `gulp/options.js`. Be sure to set `destination` and `webroot` variables to your liking, these are the most important.

5.  To initially build your assets, create the folder structure and test the installation, run:
  ```bash
    gulp build
  ```

6. If `gulp build` finished without errors, you are good to go. Run `gulp` to start developing:
  ```bash
    gulp
  ```
  
  Your development files are stored at `/src`. The built assets will be stored at `/dist` by default.
  
If you work on windows and run into `node-gyp rebuild errors`, this pages might help resolve the issue. It can have many causes, here are a few listed with resources to help you resolve these issues:
 - python not installed or set in PATH (https://github.com/nodejs/node-v0.x-archive/issues/4047)
 - wrong Visual Studio version configured in node (http://stackoverflow.com/questions/14278417/cannot-install-node-modules-that-require-compilation-on-windows-7-x64-vs2012)
