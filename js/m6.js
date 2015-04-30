module.exports = function () {
	window.setTimeout(function () {
		console.log('module 1');
	}, 1000);
};

module.exports.async = false;