import CES from 'ces'
import { rnd } from '../game'

export default class Thirst extends CES.Component {
	constructor(initValue) {
		super()
		this.name = 'thirst'
		this._value = initValue || rnd.floating({ min: 0, max: 0.3 })

		this.change = 0.013
	}

	set value(v) {
		this._value = Math.limit(v)
	}
}
