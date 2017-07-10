import CES from 'ces'
import Vector from '../vector'

export default class Mover extends CES.Component {
	constructor({ pos, acceleration, force, velocity }) {
		super()
		this.name = 'mover'

		// Direction-aware velocity
		this.velocity = velocity || new Vector()

		// constant addition
		this.acceleration = acceleration || new Vector()

		// Force is reset each frame.
		// Should be used to apply impulse forces, like jump.
		this.force = force || new Vector()

		// Real position of Actor, right before it's rounded for view
		this.realPos = new Vector(pos.x || 0, pos.y || 0)
	}

	// TODO: Move physics related stuff to components, if needed at all
	applyForce(_x, _y) {
		this.force.x += _x
		this.force.y += _y
	}

	get speed() {
		return this.velocity.get_length2D()
	}
	set speed(v) {
		this.velocity.set_length2D(v)
		return this.velocity.get_length2D()
	}
}
