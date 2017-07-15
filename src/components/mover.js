import Component from '../component'
import Vector from '../vector'
import { world, gameWidth, gameHeight } from '../game'

export default class Mover extends Component {
	constructor({ pos, acceleration, force, velocity } = {}) {
		super('mover')

		// Direction-aware velocity
		this.velocity = velocity || new Vector()

		// constant addition
		this.acceleration = acceleration || new Vector()

		// Force is reset each frame.
		// Should be used to apply impulse forces, like jump.
		this.force = force || new Vector()

		// Real position of entity, right before it's rounded for view
		this.realPos = new Vector(pos && pos.x || 0, pos && pos.y || 0)

		this.bounds = {
			x: 20, y: 60,
			w: gameWidth - 40,
			h: gameHeight - 120
		}
	}

	update(dt, entity) {
		entity.x = Math.round(this.realPos.x)
		entity.y = Math.round(this.realPos.y)

		this.velocity.add(this.force)
		this.velocity.add(this.acceleration)

		// TODO: do I need delta fix? It's like 60-80 in here
		this.realPos.x += this.velocity.x * dt
		this.realPos.y += this.velocity.y * dt

		keepInBounds(this.realPos, this.velocity, this.bounds)

		// Reset force back to zero
		this.force.set_xy(0, 0)
	}

	postUpdate() {
		// FIXME: this shouldn't be here
		// FIXME: it should at least respect child type (don't sort UI or Bubbles)
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

function keepInBounds(pos, vel, bounds) {
	if (pos.x > bounds.w + bounds.x) {
		pos.x = bounds.w + bounds.x
		vel.x = -vel.x
	} else if (pos.x < bounds.x) {
		pos.x = bounds.x
		vel.x = -vel.x
	}
	if (pos.y > bounds.h + bounds.y) {
		pos.y = bounds.h + bounds.y
		vel.y = -vel.y
	} else if (pos.y < bounds.y) {
		pos.y = bounds.y
		vel.y = -vel.y
	}
}
