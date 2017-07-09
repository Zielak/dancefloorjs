import {rnd, world} from './game'
import CES from 'ces'
import Mover from './components/mover'
import Vector from './vector'

/**
 * Actor should be an extension of SVG element
 * 
 * @class Actor
 */
export default class Actor extends CES.Entity {

	constructor({pos}){
		super()

		this.addComponent(new Mover({pos: pos}))

		// Self add itself to the world
		world.addEntity(this)
	}

}