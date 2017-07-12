import {world} from './game'
import CES from 'ces'

export default class Entity extends CES.Entity {

	constructor(){
		super()
		
		world.addEntity(this)
	}

	addComponent(component) {
		super.addComponent(component)
		component.entity = this
	}

	removeComponent(component) {
		super.removeComponent(component)
		component.entity = undefined
	}

}