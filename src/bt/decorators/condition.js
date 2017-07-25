class Condition extends b3.Decorator{
	constructor ({name = 'Condition', checkCondition = () => false, child}) {
		super({name, child})
		this.checkCondition = checkCondition
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

export default Condition
