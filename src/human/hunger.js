import Component from '../component'
import { rnd } from '../game'

export default class Hunger extends Component {
	constructor(initValue) {
		super('hunger')
		this._value = initValue || rnd.float(0, 0.1)

		this.change = 0.006
	}

	get value() { return this._value }
	set value(v) {
		this._value = Math.limit(v)
	}

	update(dt) {
		this.value += dt * this.change
	}
}
