var path = require('path');
var notifier = require('node-notifier');
var package = require('../../package.json');
var processWindows = require('node-process-windows');

module.exports = function (err) {
  notifier.notify({
    title: package.name,
    message: err.messageOriginal || err.message,
    icon: path.resolve('gulp/utils/logo.png'),
    sound: false,
    wait: true,
    timeout: 2,
    type: 'error'
  }, function (err, response, metadata) {
    if (response === 'activate') {
      var activeProcesses = processWindows.getProcesses(function(err, processes) {
        var consoleWindow = processes.filter(function (process) {
          return process.mainWindowTitle == package.name && process.processName == 'cmd';
        });
        processWindows.focusWindow(consoleWindow[0]);
      });
    }
  });
}