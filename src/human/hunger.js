import CES from 'ces'
import { rnd } from '../game'

export default class Hunger extends CES.Component {
	constructor(initValue) {
		super()
		this.name = 'hunger'
		this._value = initValue || rnd.floating({ min: 0, max: 0.1 })

		this.change = 0.001
	}

	set value(v) {
		this._value = Math.limit(v)
	}
}
