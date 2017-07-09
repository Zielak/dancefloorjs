import CES from 'ces'
import {rnd} from '../game'

export default class HumanSystem extends CES.System {
	update(dt){
		this.world.getEntities('thirst').forEach(ent => {
			let thirst = ent.getComponent('thirst')
			thirst.value += dt * 0.013
		})
	}
}
