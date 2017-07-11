import {world} from './game'
import CES from 'ces'

const _systems = {}

/**
 * It's a mix of CES's Component and System
 * 
 * @export
 * @class Component
 */
export default class Component {

	constructor(name) {
		const _name = name
		this.component = new CES.Component()
		this.component.name = _name
		
		if (_systems[_name] === undefined) {
			_systems[_name] = new CES.System()
			_systems[_name].update = dt => updateSystem(dt, _name)
			this.system = _systems[_name]
			world.addSystem(this)
		} else {
			this.system = _systems[_name]
		}
		
		// Make sure component knows its master
		this.component._master = this
		
	}
	
	addedToWorld(world) {
		this.system.addedToWorld(world)
	}

	removedFromWorld(world) {
		this.system.removedFromWorld(world)
	}


	/**
	 * SHOULD be overriden
	 * 
	 * @param {any} dt 
	 * @memberof Component
	 */
	update(dt) {
		throw new Error('Subclassed should override this method', dt)
	}
	
	get entity() {
		return world.getEntities([this.component.name])
	}
}

function updateSystem(dt, name) {
	world.getEntities(name).forEach(ent => {
		let comp = ent.getComponent(name)
		comp._master.update(dt)
	})
}
