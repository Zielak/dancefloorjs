import Component from "../component"

import rnd from "../utils/rnd"
import { limit } from "../utils/math"

export default class Thirst extends Component {
	constructor(initValue) {
		super("thirst")
		this._value = initValue || rnd.floating({ min: 0, max: 0.3 })

		this.change = 0.015
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
