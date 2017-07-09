var assert = require('assert')

import Vector from '../src/vector'

describe('Vector', function() {
	let vector
	beforeEach(function(){
		vector = new Vector()
	})
	describe('#set_xy()', function() {
		it('should apply both x and y', function() {
			vector.set_xy(1, 1)
			assert.equal(vector.x, 1, 'x didnt change')
			assert.equal(vector.y, 1, 'y didnt change')
		})
		it('should return a vector', function(){
			assert(vector.set_xy(1,1) instanceof Vector, `did not return a vector: ${typeof vector.set_xy(1,1)}`)
		})
	})
})
