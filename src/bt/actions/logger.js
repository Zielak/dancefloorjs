import * as b3 from 'behavior3js'
import * as PIXI from 'pixi.js'
import Bubble from '../../components/bubble'

const Logger = b3.Class(b3.Action)
const _ = Logger.prototype

_.name = 'Logger'
_.parameters = {
	message: '-silence-',
	textStyle: {
		fontSize: 12,

	},
	entity: undefined,
}

_.initialize = function (settings) {
	this.message = settings.message || _.parameters.message
	this.textStyle = settings.textStyle || _.parameters.textStyle
	this.entity = settings.entity || _.parameters.entity
}
_.enter = function (tick) {
	this.entity.addComponent(new Bubble(
		this.message,
		this.textStyle,
		new PIXI.Rectangle(-50, 0, 100, 18)
	))
}
_.tick = function () {
	if (!this.entity) {
		return b3.FAILURE
	}
	// console.log(`%c ${this.message} `, this.style)
	return b3.SUCCESS
}

export default Logger
