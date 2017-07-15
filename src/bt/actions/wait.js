class Wait extends b3.Action {
	
	constructor (settings) {
		super(settings)
		
		this.milliseconds = settings.milliseconds || this.parameters.milliseconds
		this.addRandom = settings.addRandom || this.parameters.addRandom
	}
	open (tick) {
		console.log('opened wait')
		var endTime = (new Date()).getTime() + this.milliseconds + (Math.random() * this.addRandom)
		tick.blackboard.set('endTime', endTime, tick.tree.id, this.id)
	}
	close (tick) {
		console.log('closed wait')
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

Wait.prototype.name = 'WaitRandom'
Wait.prototype.parameters = {
	milliseconds: 1000,
	addRandom: 0,
}

export default Wait
