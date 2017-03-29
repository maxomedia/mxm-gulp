var notify = require('./notify');

module.exports = {
  errorHandler: function (err) {
    if (err) {

      // Log the error to console
      console.log(err.toString());

      // Use notifier if not production
      if (process.argv.indexOf('--production') < 0) {
        notify(err);
      }
    }

    this.emit('end');
  }
}