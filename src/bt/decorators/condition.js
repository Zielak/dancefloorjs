class Condition extends b3.Decorator{
	constructor ({name = 'Condition', checkCondition = () => false, child}) {
		super({name, child})
		this.checkCondition = checkCondition
	}
	tick (tick) {
		if (!this.child) {
			return b3.ERROR
		}
		
		let status = b3.SUCCESS
		
		// If condition doesn't return true, then
		// I don't have to do anything this time
		if (this.checkCondition()) {
			status = this.child._execute(tick)
		}
		return status
	}
}

export default Condition
