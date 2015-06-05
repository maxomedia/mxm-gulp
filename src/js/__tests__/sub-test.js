var sub = require('../sub/sub');

describe('sub.js', function () {
	it('should equal 4', function () {
		sub(2,2).should.equal(4);
	});
});