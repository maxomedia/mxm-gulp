# mxm-gulp

The buildsystem we use at maxomedia.

#### Features
- Less to CSS (autoprefixed, sourcemaps, minified)
- JavaScript bundles with browserify (multiple bundles)
- Jade to HTML
- Iconfont generation from .svg (with Less mixin and class references, [ttf, woff, svg, eot])
- Build on save
- Separate DEV and STAGE builds to speed up development
- Error logging with windows notification and in the console

#### Prerequisites
You should know how to run gulp. If you are not familiar with it, here is a list of things you must have installed to use gulp.
- node.js (http://nodejs.org/)
- npm (https://www.npmjs.com/)
- gulp (http://gulpjs.com/)

#### Installation
Download the zip or clone the repository (mind the dot at the end of the command, if you want to clone to current directory):
```shell
  $ git clone https://github.com/maxomedia/mxm-gulp.git .
```

Next, install the npm dependencies with:
```shell
  $ npm install
```

Finally, run gulp to build your assets and start watching your development files:
```shell
  $ gulp
```

#### Documentation
Please refer to the [wiki](https://github.com/maxomedia/mxm-gulp/wiki) of this repo for detailed information for each task.
