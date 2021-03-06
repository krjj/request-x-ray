var request = require('request')
var Xray = require('x-ray')
var makeDriver = require('../')
var assert = require('assert')

describe('Driver', function() {
	describe('Arguments', function() {
		it('Should work with no argument', function(done) {
			var x = Xray()
			var driver = makeDriver()
			x.driver(driver)

			testInstance(x, done)
		})

		it('Should work with an object argument', function(done) {
			var x = Xray()
			var driver = makeDriver({})
			x.driver(driver)

			testInstance(x, done)
		})

		it('Should work with a function argument', function(done) {
			var x = Xray()
			var driver = makeDriver(request.defaults({method:"POST"}))
			x.driver(driver)

			testInstance(x, done)
		})
	})

	describe('Errors', function() {
		it('Should pass on errors', function(done) {
			var x = Xray()
			var driver = makeDriver()
			x.driver(driver)

			testInstance(x, "http://NotARealUrl.com", function(err, res) {
				assert(err)
				done()
			})
		})
	})
})

function testInstance(r, url, callback) {
	if(!callback) {
		callback = url
		url = "https://news.ycombinator.com"
	}

	r(url, 'title')(callback)
}