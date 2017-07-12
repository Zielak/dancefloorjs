import * as b3 from 'behavior3js'

const Logger = b3.Class(b3.Action)
const _ = Logger.prototype

_.name = 'Logger'
_.parameters = {
	message: '-silence-',
	style: 'color: #777; font-style: italics',
}

_.initialize = function(settings) {
	this.message = settings.message || _.parameters.message
	this.style = settings.style || _.parameters.style
}
_.open = function (tick) {
	var endTime = (new Date()).getTime() + this.milliseconds + (Math.random() * this.addRandom)
	tick.blackboard.set('endTime', endTime, tick.tree.id, this.id)
}
_.tick = function () {
	console.log(`%c ${this.message} `, this.style)
	return b3.SUCCESS
}

export default Logger
