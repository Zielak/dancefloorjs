import Component from "../component"
import Game from "../game"

export default class Thirst extends Component {
	constructor(initValue) {
		super("thirst")
		this._value = initValue || Game.rnd.float(0, 0.3)

		this.change = 0.015
	}

	get value() {
		return this._value
	}
	set value(v) {
		this._value = Math.limit(v)
	}

	update(dt) {
		this.value += dt * this.change
	}
}
