var path = require("path");

// Filters out non .coffee and .js files. Prevents
// accidental inclusion of possible hidden files
// SOURCE: https://github.com/greypants/gulp-starter/blob/master/gulp/util/scriptFilter.js

module.exports = function(name) {
    return /(\.(js|coffee)$)/i.test(path.extname(name));
};