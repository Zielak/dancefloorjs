const Wait = b3.Class(b3.Action)
const _ = Wait.prototype

_.name = 'WaitRandom'
_.parameters = {
	milliseconds: 1000,
	addRandom: 0,
}

_.initialize = function(settings) {
	b3.Action.prototype.initialize.call(this, settings)
	this.milliseconds = settings.milliseconds || _.parameters.milliseconds
	this.addRandom = settings.addRandom || _.parameters.addRandom
}
_.open = function (tick) {
	console.log('opened wait')
	var endTime = (new Date()).getTime() + this.milliseconds + (Math.random() * this.addRandom)
	tick.blackboard.set('endTime', endTime, tick.tree.id, this.id)
}
_.close = function (tick) {
	console.log('closed wait')
}
_.tick = function (tick) {
	var currTime = (new Date()).getTime()
	var endTime = tick.blackboard.get('endTime', tick.tree.id, this.id)

	if (currTime > endTime) {
		return b3.SUCCESS
	}

	return b3.RUNNING
}

export default Wait
