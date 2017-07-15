import * as b3 from 'behavior3js'
import * as PIXI from 'pixi.js'
import Bubble from '../../components/bubble'

const Logger = b3.Class(b3.Action)
const _ = Logger.prototype

_.name = 'Logger'
_.parameters = {
	message: '-silence-',
	textStyle: {fill: 0x000000},
	background: 0xffffff,
	entity: undefined,
}

_.initialize = function (settings) {
	this.message = settings.message || _.parameters.message
	this.textStyle = Object.assign({}, _.parameters.textStyle, settings.textStyle || {})
	this.background = settings.background || _.parameters.background
	this.entity = settings.entity || _.parameters.entity
}
_.enter = function (tick) {
	this.entity.addComponent(new Bubble({
		message: this.message,
		textStyle: this.textStyle,
		rectangle: new PIXI.Rectangle(-50, 0, 100, 18),
		background: this.background
	}))
}
_.tick = function () {
	if (!this.entity) {
		return b3.FAILURE
	}
	// console.log(`%c ${this.message} `, this.style)
	return b3.SUCCESS
}

export default Logger
