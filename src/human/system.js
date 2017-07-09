import CES from 'ces'
import {rnd} from '../game'

export default class HumanSystem extends CES.System {
	update(dt){
		this.world.getEntities('thirst', 'mover').forEach(ent => {
			let comp

			// Thirst
			comp = ent.getComponent('thirst')
			comp.value += dt * 0.013

			// Mover
			comp = ent.getComponent('mover')
			comp && comp.update(dt, ent)
		})
	}
}
