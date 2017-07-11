import Component from '../component'
import { rnd } from '../game'

export default class Hunger extends Component {
	constructor(initValue) {
		super('hunger')
		this._value = initValue || rnd.floating({ min: 0, max: 0.1 })
		
		this.change = 0.001
	}

	set value(v) {
		this._value = Math.limit(v)
	}
	
	update(dt) {
		this.value += dt * this.change
	}
}
