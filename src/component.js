import Game from "./game"
import CES from "ces"

const _systems = {}

/**
 * It's a mix of CES's Component and System
 *
 * @export
 * @class Component
 */
export default class Component {
	constructor(name) {
		this.name = name
		this.component = new CES.Component()
		this.component.name = this.name

		if (_systems[this.name] === undefined) {
			_systems[this.name] = new CES.System()
			_systems[this.name].update = (dt) => {
				updateComponents(dt, this.name)
				this._postUpdate(dt)
			}
			this.system = _systems[this.name]
			Game.world.addSystem(this.system)
		} else {
			this.system = _systems[this.name]
		}
	}

	addedToWorld(world) {
		this.system.addedToWorld(world)
	}

	removedFromWorld(world) {
		this.system.removedFromWorld(world)
	}

	/**
	 * Override this to get notified when a component is added to entity.
	 *
	 * @param {Entity} entity on which this component is added
	 * @memberof Component
	 */
	addedToEntity(/*entity*/) {}

	/**
	 * Override this to get notified when a component is being removed from entity.
	 *
	 * @param {Entity} entity from which this component gets removed
	 * @memberof Component
	 */
	removedFromEntity(/*entity*/) {}

	get entity() {
		return this._entity
	}

	/**
	 * Update function for each entitie's component
	 *
	 * @param {number} dt
	 * @memberof Component
	 */
	update(dt) {
		throw new Error("Subclassed should override this method", dt)
	}

	/**
	 * Run only once per system, after all components have been updated
	 *
	 * @memberof Component
	 */
	_postUpdate() {
		!!this.postUpdate && this.postUpdate(Game.world.getEntities([this.name]))
	}
}

function updateComponents(dt, name) {
	Game.world.getEntities(name).forEach((ent) => {
		let comp = ent.getComponent(name)
		comp.update(dt, ent)
	})
}
