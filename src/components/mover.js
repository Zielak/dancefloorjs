import CES from 'ces'
import Vector from '../vector'

export default class Mover extends CES.Component {
	constructor({pos}){
		super()
		this.name = 'mover'
		
		// Direction-aware velocity
		this.velocity = new Vector()

		// constant addition
		this.acceleration = new Vector()

		// Force is reset each frame.
		// Should be used to apply impulse forces, like jump.
		this.force = new Vector()
		
		// Real position of Actor, right before it's rounded for view
		this.realPos = new Vector(pos.x || 0, pos.y || 0)
	}

	// TODO: Move physics related stuff to components, if needed at all
	applyForce(_x, _y) {
		this.force.x += _x;
		this.force.y += _y;
	}

	get speed() {
		return this.velocity.get_length2D()
	}
	set speed(v) {
		this.velocity.set_length2D(v)
		return this.velocity.get_length2D()
	}

	update(dt, entity){
		entity.x = Math.round(this.realPos.x)
		entity.y = Math.round(this.realPos.y)

		// TODO: use it some day. z-index or something?
		// this.entity.depth = realPos.y / 1000;

		this.velocity.add(this.force)
		this.velocity.add(this.acceleration)
		
		this.realPos.x += this.velocity.x * dt
		this.realPos.y += this.velocity.y * dt

		this.force.set_xy(0, 0)
	}
}
