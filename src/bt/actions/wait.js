import * as b3 from 'behavior3js'

const Wait = b3.Class(b3.Wait)
const _ = Wait.prototype

_.name = 'WaitRandom'
_.parameters = {
	'milliseconds': 3000,
	'addRandom': 0,
}

_.initialize = function(settings) {
	this.milliseconds = settings.milliseconds || _.parameters.milliseconds
	this.addRandom = settings.addRandom || _.parameters.addRandom
}
_.open = function (tick) {
	var endTime = (new Date()).getTime() + this.milliseconds + (Math.random() * this.addRandom)
	tick.blackboard.set('endTime', endTime, tick.tree.id, this.id)
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
