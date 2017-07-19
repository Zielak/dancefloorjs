import Game from './game'
import CES from 'ces'

export default class Entity extends CES.Entity {

	constructor(){
		super()
		
		Game.world.addEntity(this)
	}

	addComponent(component) {
		super.addComponent(component)
		component._entity = this
		component.addedToEntity()
	}

	removeComponent(component) {
		component.removedFromEntity()
		super.removeComponent(component.component)
		component._entity = undefined
	}

}