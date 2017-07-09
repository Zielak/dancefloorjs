import CES from 'ces'
import {rnd} from '../game'

const handlers = {
	thirst: (ent, dt) => {
		let comp = ent.getComponent('thirst')
		comp.value += dt * comp.change
	},
	intoxication: (ent, dt) => {
		let comp = ent.getComponent('intoxication')
		comp.value -= dt * comp.change
	},
	hunger: (ent, dt) => {
		let comp = ent.getComponent('hunger')
		comp.value += dt * comp.change
	},
	mover: (ent, dt) => {
		let comp = ent.getComponent('mover')
		comp && comp.update(dt, ent)
	}
}

export default class HumanSystem extends CES.System {
	update(dt){
		Object.keys(handlers).forEach( key => {
			this.world.getEntities( key ).forEach( ent => handlers[key](ent, dt) )
		})
	}
}
