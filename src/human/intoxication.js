import Component from '../component'
import { rnd } from '../game'

export default class Intoxication extends Component {
	constructor(initValue) {
		super('intoxication')
		this._value = initValue || rnd.floating({ min: 0, max: 0.2 })

		this.change = 0.011
	}

	set value(v) {
		this._value = Math.limit(v)
	}
	
	update(dt) {
		this.value += dt * this.change
	}
}
