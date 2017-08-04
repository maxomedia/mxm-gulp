function setProduction(done) {
	process.argv.push('--production');
	done();
}

module.exports = setProduction;