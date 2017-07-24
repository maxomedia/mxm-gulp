# mxm-[gulp](https://github.com/gulpjs/gulp)
[![Build Status](https://travis-ci.org/maxomedia/mxm-gulp.svg?branch=develop)](https://travis-ci.org/maxomedia/mxm-gulp)

The buildsystem we use at [Maxomedia AG](https://maxomedia.ch/).

#### Features
- `gulp` / `npm run gulp`
  - Build all files once, watch files for changes and start local dev server (port and other info is logged to the console)
- `gulp build` / `npm run build`
  - Build all files once (fast build, not minified)
- `gulp stage` / `npm run build --production`
  - Build and minify all files
- `gulp sass` / `npm run sass` [SCSS to CSS](https://github.com/dlmanning/gulp-sass)
  - [Autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
  - [Sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
  - Add `--production` flag for minified CSS
- `gulp webpack` / `npm run webpack`
  - JavaScript bundles with [webpack](https://github.com/webpack/webpack)
  - ES6 with [Babel transpiler](https://babeljs.io/docs/plugins/preset-es2015/) presets
  - multiple bundles
  - sourcemaps
  - minified
  - CommonJS
  - Add `--production` flag for minified JS
- `gulp handlebars` / `npm run handlebars`
  - Uses [Handlebars Layouts](https://github.com/shannonmoeller/handlebars-layouts) so you can use a master layout file, partials and pages
  - Pass in data as JSON
- `gulp pug` / `npm run pug`
  - [Pug to HTML](https://github.com/pugjs/gulp-pug)
- `gulp svg-sprite` / `npm run svg-sprite`
  - Build a [svg-sprite](https://github.com/jkphl/gulp-svg-sprite)
  - Create a Scss with dimension info
  - A HTML page displaying all available icons
- `gulp static` / `npm run static`
  - Task to copy static files to the destination folder, e.g. fonts or images
- `gulp serve` / `npm run serve`
  - Build and serve all files without watchers
- [BrowserSync](https://github.com/BrowserSync/browser-sync)
  - Livereload on save
  - Mind the settings at `localhost:3001` for input syncing and weinre remote debugger
- Error logging with system notifications and in the console

#### Prerequisites
You should know how to run gulp. If you are not familiar with it, here is a list of things you must have installed in order to use gulp.
- node.js v6+ (http://nodejs.org/)

#### Installation
1. Download the zip and place its contents where you want to use them

2. Open a command prompt and navigate to the folder where gulpfile.js lies.

3. Next, install the npm dependencies and the global gulp 4.0 alpha module:
  ```bash
    npm install
    npm install gulpjs/gulp#4.0 -g
  ```

4.  Now's the time to set your options. You can find them under `gulp/options.js`. Be sure to set `destination` and `webroot` variables to your liking, these are the most important.

5. Run `gulp` to start developing:
  ```bash
    gulp
  ```
  
  Your development files are stored at `/Frontend`. The built assets will be stored at `/Assets` by default.
  
If you work on windows and run into `node-gyp rebuild errors`, this pages might help resolve the issue. It can have many causes, here are a few listed with resources to help you resolve these issues:
 - python not installed or set in PATH (https://github.com/nodejs/node-v0.x-archive/issues/4047)
 - wrong Visual Studio version configured in node (http://stackoverflow.com/questions/14278417/cannot-install-node-modules-that-require-compilation-on-windows-7-x64-vs2012)
