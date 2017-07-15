import {rnd} from '../../game'

class WalkRandomAngle extends b3.Action {

	constructor (settings) {
		super(settings)
		
		this.milliseconds = settings.milliseconds || 3000
		this.addRandom = settings.addRandom || 0
		this.entity = settings.entity
	}
	open (tick) {
		console.log('opened walkRandom')
		const endTime = (new Date()).getTime() + this.milliseconds + (Math.random() * this.addRandom)
		const mover = this.entity.getComponent('mover')
		mover.velocity.set_xy(0, 100).setAngle(rnd.float(0,360))

		tick.blackboard.set('endTime', endTime, tick.tree.id, this.id)
		tick.blackboard.set('mover', mover, tick.tree.id, this.id)
	}
	close (tick) {
		console.log('closing walkRandom')
		const mover = tick.blackboard.get('mover', tick.tree.id, this.id)
		mover.velocity.set_xy(0,0)
	}
	tick (tick) {
		var currTime = (new Date()).getTime()
		var endTime = tick.blackboard.get('endTime', tick.tree.id, this.id)

		if (currTime > endTime) {
			return b3.SUCCESS
		}

		return b3.RUNNING
	}
}

WalkRandomAngle.prototype.name = 'WalkRandomAngle'
WalkRandomAngle.prototype.parameters = {
	milliseconds: 3000,
	addRandom: 0,
	entity: undefined,
}

export default WalkRandomAngle
