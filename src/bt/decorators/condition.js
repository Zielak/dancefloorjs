const Condition = b3.Class(b3.Decorator)
const _ = Condition.prototype

_.name = 'Condition'
_.parameters = {
	checkCondition: () => false,
}

_.initialize = function (settings) {
	b3.Decorator.prototype.initialize.call(this, settings)
	this.checkCondition = settings.checkCondition || _.parameters.checkCondition
}
_.tick = function (tick) {
	if (!this.child) {
		return b3.ERROR
	}
	let status = b3.FAILURE
	if (this.checkCondition()) {
		status = this.child._execute(tick)
	}
	return status
}

export default Condition
