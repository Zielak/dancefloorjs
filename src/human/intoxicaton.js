import CES from 'ces'
import { rnd } from '../game'

export default class Intoxication extends CES.Component {
	constructor(initValue) {
		super()
		this.name = 'intoxication'
		this._value = initValue || rnd.floating({ min: 0, max: 0.2 })

		this.change = 0.011
	}

	set value(v) {
		this._value = Math.limit(v)
	}
}
