class Condition extends b3.Decorator{
	constructor (settings) {
		super(settings)
		
		this.checkCondition = settings.checkCondition || this.parameters.checkCondition
	}
	tick (tick) {
		if (!this.child) {
			return b3.ERROR
		}
		let status = b3.FAILURE
		if (this.checkCondition()) {
			status = this.child._execute(tick)
		}
		return status
	}
}

Condition.prototype.name = 'Condition'
Condition.prototype.parameters = {
	checkCondition: () => false,
}

export default Condition
