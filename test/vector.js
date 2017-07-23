import test from 'ava'
import Vector from '../src/vector'

let vector

test.beforeEach(t => {
	vector = new Vector()
})

test('#set_xy() should apply both x and y', t => {
	vector.set_xy(1, 1)
	t.is(vector.x, 1, 'x didnt change')
	t.is(vector.y, 1, 'y didnt change')
})

test('#set_xy() should return a vector', t => {
	const vec = vector.set_xy(1,1)
	t.true(vec instanceof Vector, `did not return a vector: ${typeof vec}`)
})
