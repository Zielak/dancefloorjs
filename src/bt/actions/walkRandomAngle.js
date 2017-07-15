import {rnd} from '../../game'

const WalkRandomAngle = b3.Class(b3.Action)
const _ = WalkRandomAngle.prototype

_.name = 'WalkRandomAngle'
_.parameters = {
	milliseconds: 3000,
	addRandom: 0,
	entity: undefined,
}

_.initialize = function(settings) {
	b3.Action.prototype.initialize.call(this, settings)
	this.milliseconds = settings.milliseconds || _.parameters.milliseconds
	this.addRandom = settings.addRandom || _.parameters.addRandom
	this.entity = settings.entity || _.parameters.entity
}
_.open = function (tick) {
	console.log('opened walkRandom')
	const endTime = (new Date()).getTime() + this.milliseconds + (Math.random() * this.addRandom)
	const mover = this.entity.getComponent('mover')
	mover.velocity.set_xy(0, 100).setAngle(rnd.float(0,360))

	tick.blackboard.set('endTime', endTime, tick.tree.id, this.id)
	tick.blackboard.set('mover', mover, tick.tree.id, this.id)
}
_.close = function (tick) {
	console.log('closing walkRandom')
	const mover = tick.blackboard.get('mover', tick.tree.id, this.id)
	mover.velocity.set_xy(0,0)
}
_.tick = function (tick) {
	var currTime = (new Date()).getTime()
	var endTime = tick.blackboard.get('endTime', tick.tree.id, this.id)

	if (currTime > endTime) {
		return b3.SUCCESS
	}

	return b3.RUNNING
}

export default WalkRandomAngle
