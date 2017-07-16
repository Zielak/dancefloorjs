import Component from '../component'
import Vector from '../vector'
import pathfinding from '../pathfinding'
import { world, gameWidth, gameHeight } from '../game'

export default class Mover extends Component {
	constructor({ pos, acceleration, force, velocity } = {}) {
		super('mover')

		// Direction-aware velocity
		this.velocity = velocity || new Vector()

		this.maxSpeed = 100

		// constant addition
		this.acceleration = acceleration || new Vector()

		// Force is reset each frame.
		// Should be used to apply impulse forces, like jump.
		this.force = force || new Vector()

		// Real position of entity, right before it's rounded for view
		this.realPos = new Vector(pos && pos.x || 0, pos && pos.y || 0)

		// Used in pathfinding, will go to each point one by one
		this.path = []

		this.bounds = {
			x: 20, y: 60,
			w: gameWidth - 40,
			h: gameHeight - 120
		}
	}

	update(dt, entity) {
		entity.x = Math.round(this.realPos.x)
		entity.y = Math.round(this.realPos.y)
		entity._x = this.realPos.x
		entity._y = this.realPos.y

		this.velocity.add(this.force)
		this.velocity.add(this.acceleration)
		
		if(this.path && this.path.finished === false){
			updatePathMovement(this.path, this.realPos, this.velocity)
		}

		this.realPos.x += this.velocity.x * dt
		this.realPos.y += this.velocity.y * dt

		keepInBounds(this.realPos, this.velocity, this.bounds)

		limitVelocity(this.velocity, this.maxSpeed)

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

	moveAlongPath(path){
		// COPY the path. We'll be modyfying it
		this.path = path.slice(0)
		this.path.target = 0
		this.path.finished = false
	}
	clearPath(){
		this.path = []
	}

	get movingAlongPath() {
		return this.path.length > 0 && this.path.finished === false
	}
	get reachedPathDestination() {
		return this.path.length > 0 && this.path.finished === true
	}

	get speed() {
		return this.velocity.get_length2D()
	}
	set speed(v) {
		this.velocity.set_length2D(v)
		return this.velocity.get_length2D()
	}
}

function updatePathMovement(path, position, velocity){
	// check if we're in position yet
	const current = pathfinding.worldPos2GridPos(position)

	let target = path[path.target] || current

	if(current.x === target.x && current.y === target.y){
		if(++path.target > path.length-1){
			path.finished = true
			return
		}else{
			target = path[path.target]
			// console.log('went though',target,`${path.length - path.target} points to go`)
		}
	}
	// go straight to closest point
	if(velocity.length < 100){
		velocity.x = 100
	}
	velocity.angle2D = Math.atan2(current.y - target.y, current.x - target.x) - Math.PI

}

function keepInBounds(pos, velocity, bounds) {
	if (pos.x > bounds.w + bounds.x) {
		pos.x = bounds.w + bounds.x
		velocity.x = -velocity.x
	} else if (pos.x < bounds.x) {
		pos.x = bounds.x
		velocity.x = -velocity.x
	}
	if (pos.y > bounds.h + bounds.y) {
		pos.y = bounds.h + bounds.y
		velocity.y = -velocity.y
	} else if (pos.y < bounds.y) {
		pos.y = bounds.y
		velocity.y = -velocity.y
	}
}

function limitVelocity(velocity, maxSpeed){

}
