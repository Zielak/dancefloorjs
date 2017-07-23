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

test('#length', t => {
	vector.x = 1
	t.is(vector.length, 1)

	vector.length = 5
	t.is(vector.length, 5)
})

test('#round', t => {
	vector.set_xy(0.6, 2.3).round()

	t.is(vector.x, 1)
	t.is(vector.y, 2)
})

test('#equals', t => {
	t.true(vector.equals(new Vector(0,0)))
})

test('#toString', t => {
	t.is(vector.toString(), '{ x: 0, y: 0 }')
})

test('#divideScalar', t => {
	vector.set_xy(15, -20)
	t.is(vector.divideScalar(0).toString(), '{ x: 0, y: 0 }')
	vector.set_xy(15, -20)
	t.is(vector.divideScalar(1).toString(), '{ x: 15, y: -20 }')
})
