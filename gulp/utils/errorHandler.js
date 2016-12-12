module.exports = {
	errorHandler: function (err) {
		console.log(err.toString());
		this.emit('end');
	}
}