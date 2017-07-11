import {world} from './game'
import CES from 'ces'

export default class Entity extends CES.Entity {

	constructor(){
		super()
		
		world.addEntity(this)
	}

}