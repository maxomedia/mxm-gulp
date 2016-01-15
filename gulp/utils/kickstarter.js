var events = require('events');

var kickstarter = new events.EventEmitter();
kickstarter.setMaxListeners(20);
module.exports = kickstarter;