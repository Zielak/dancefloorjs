import Component from "../component"
import rnd from "../utils/rnd"
import { limit } from "../utils/math"

export default class Hunger extends Component {
	constructor(initValue) {
		super("hunger")
		this._value = initValue || rnd.floating({ min: 0, max: 0.1 })

		this.change = 0.006
	}

	get value() {
		return this._value
	}
	set value(v) {
		this._value = limit(v)
	}

	update(dt) {
		this.value += dt * this.change
	}
}
