import * as Game from './game'
import Vector from './vector'

/**
 * Actor should be an extension of SVG element
 * 
 * @class Actor
 */
export default class Actor {

	constructor({pos}){

		this.components = {
			add: components =>
				Game.manager.addComponentsToEntity(components, this.entityId),
			has: component => 
				Game.manager.entityHasComponent(this.entityId, component),
			get: components =>
				Game.manager.getComponentDataForEntity(this.entityId, components),
			remove: component =>
				Game.manager.removeComponentsFromEntity(component, this.entityId)
		}

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


	init() {
		this.realPos = Object.assign(new Vector(), this.pos);

		// Main.physics.add(this);
	}

	ondestroy() {
		// Main.physics.remove(this);
		this.velocity = undefined
		this.acceleration = undefined
		this.force = undefined
		this.realPos = undefined
	}

	/**
	 * 
	 * 
	 * @param {number} dt 
	 * @memberof Actor
	 */
	update(dt) {
		this.pos.copy_from(this.realPos);

		this.pos.x = Math.round(this.pos.x);
		this.pos.y = Math.round(this.pos.y);
		this.pos.z = Math.round(this.pos.z);

		// TODO: use it some day. z-index or something?
		this.depth = realPos.y / 1000;

		updateGeometryHeight();
	}


	applyForce(_x, _y, _z = 0) {
		force.x += _x;
		force.y += _y;
		force.z += _z;
	} // applyForce


	/**
	 * Calls step() on every mover type component and collider
	 * 
	 * @param {Float} dt 
	 * @memberof Actor
	 */
	step(dt) {

		this.stepComponents(dt, controller);
		this.stepComponents(dt, mover);
		this.stepComponents(dt, collider);

		velocity.add(force);
		velocity.add(acceleration);

		// Clean vectors
		if (Math.abs(velocity.x) < 0.1 && velocity.x != 0) velocity.x = 0;
		if (Math.abs(velocity.y) < 0.1 && velocity.y != 0) velocity.y = 0;
		if (Math.abs(velocity.z) < 0.1 && velocity.z != 0) velocity.z = 0;

		// Limit floor
		if (velocity.z < 0 && realPos.z + velocity.z * dt < 0) {
			velocity.z = -realPos.z / dt;
		}

		realPos.x += velocity.x * dt;
		realPos.y += velocity.y * dt;
		realPos.z += velocity.z * dt;


		force.set_xyz(0, 0, 0);


		stepComponents(dt, normal);

	}


	get speed() {
		return this.velocity.get_length2D()
	}
	set speed(v) {
		this.velocity.set_length2D(v)
		return this.velocity.get_length2D()
	}

/*
	// Step all time fixed components by type
	stepComponents(dt: Float, ?type: FixedComponentType) {
		if (type == null) {
			type = FixedComponentType.normal;
		}

		var _fcomp: FixedComponent;
		for (_comp in this.components) {
			_fcomp = cast(_comp, FixedComponent);
			if (_fcomp != null) {
				// Check for type
				if (_fcomp.type == type) {
					_fcomp.step(dt);
				}
			}
		}
	}

	// Get all time fixed components or of given type
	getComponents(?type: FixedComponentType): Array<FixedComponent> {
		var _fcomp: FixedComponent;
		var _fcomps: Array<FixedComponent> = new Array<FixedComponent>();

		for (_comp in this.components) {
			_fcomp = cast(_comp, FixedComponent);
			if (_fcomp != null) {
				// Check for type
				if (_fcomp.type == type && type != null || type == null) {
					_fcomps.push(_fcomp);
				}
			}
		}

		return _fcomps;
	}
*/
}