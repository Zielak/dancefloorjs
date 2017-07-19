import Component from '../component'
import Game from '../game'

export default class Intoxication extends Component {
	constructor(initValue) {
		super('intoxication')
		this._value = initValue || Game.rnd.float(0, 0.2)

		this.change = 0.011
	}

	get value() { return this._value }
	set value(v) {
		this._value = Math.limit(v)
	}

	update(dt) {
		this.value -= dt * this.change
	}
}
