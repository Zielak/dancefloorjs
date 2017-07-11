import Component from '../component'
import { rnd } from '../game'

export default class Thirst extends Component {
	constructor(initValue) {
		super('thirst')
		this._value = initValue || rnd.floating({ min: 0, max: 0.3 })

		this.change = 0.013
	}

	set value(v) {
		this._value = Math.limit(v)
	}
	
	update(dt) {
		this.value += dt * this.change
	}
}
