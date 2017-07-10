import CES from 'ces'
import {gameWidth, gameHeight} from '../game'

export default class MovementSystem extends CES.System {
	addedToWorld(world) {
		super.addedToWorld(world)
		// TODO: new class Rect, someday
		this.bounds = {
			x: 0, y: 0,
			w: gameWidth,
			h: gameHeight
		}
	}

	removedFromWorld(world) {
		super.removedFromWorld(world)
	}

	update(dt) {
		this.world.getEntities('mover').forEach(ent => {
			let comp = ent.getComponent('mover')

			ent.x = Math.round(comp.realPos.x)
			ent.y = Math.round(comp.realPos.y)

			comp.velocity.add(comp.force)
			comp.velocity.add(comp.acceleration)

			// TODO: do I need delta fix? It's like 60-80 in here
			comp.realPos.x += comp.velocity.x * (dt / 10)
			comp.realPos.y += comp.velocity.y * (dt / 10)

			this.keepInBounds(comp.realPos, comp.velocity)

			// Reset force back to zero
			comp.force.set_xy(0, 0)
		})

		// TODO: Sort all children by pos.y zorder
	}

	keepInBounds(pos, vel) {
		if(pos.x > this.bounds.w + this.bounds.x){
			pos.x = this.bounds.w + this.bounds.x
			vel.x = -vel.x
		}else if(pos.x < this.bounds.x){
			pos.x = this.bounds.x
			vel.x = -vel.x
		}
		if(pos.y > this.bounds.h + this.bounds.y){
			pos.y = this.bounds.h + this.bounds.y
			vel.y = -vel.y
		}else if(pos.y < this.bounds.y){
			pos.y = this.bounds.y
			vel.y = -vel.y
		}
	}
}