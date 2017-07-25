import pathfinding from '../../pathfinding'

class WalkTo extends b3.Action {

	constructor (settings) {
		super({settings, name: 'WalkTo'})
		
		if(typeof settings.milliseconds === 'object'){
			this.milliseconds = {
				min: settings.milliseconds.min,
				max: settings.milliseconds.max,
			}
		}else{
			this.milliseconds = {
				min: settings.milliseconds || 3000,
				max: settings.milliseconds || 3000,
			}
		}
		this.addRandom = settings.addRandom || 0
		this.entity = settings.entity || undefined
	}
	open (tick) {
		this.timer = new Timer(
			rnd.float(this.milliseconds.min, this.milliseconds.max) + rnd.float(0, this.addRandom)
		)
		// console.log('opened walkRandom: ',this.timer.time)

		const mover = this.entity.getComponent('mover')
		mover.velocity.set_xy(0, 100).setAngle(rnd.float(0,360))
		tick.blackboard.set('mover', mover, tick.tree.id, this.id)
	}
	close (tick) {
		// console.log('closing walkRandom')
		const mover = tick.blackboard.get('mover', tick.tree.id, this.id)
		mover.velocity.set_xy(0,0)
	}
	tick (tick) {
		if (this.timer.finished) {
			return b3.SUCCESS
		}
		return b3.RUNNING
	}
}

export default WalkTo
