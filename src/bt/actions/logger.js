import * as PIXI from 'pixi.js'
import Bubble from '../../components/bubble'

class Logger extends b3.Action {
	constructor(settings) {
		super(settings)
		
		this.message = settings.message || this.parameters.message
		this.textStyle = Object.assign({}, this.parameters.textStyle, settings.textStyle || {})
		this.background = settings.background || this.parameters.background
		this.entity = settings.entity || this.parameters.entity
	}

	open(tick) {
		console.log('opened logger')
		this.entity.addComponent(new Bubble({
			message: this.message,
			textStyle: this.textStyle,
			rectangle: new PIXI.Rectangle(-50, 0, 100, 18),
			background: this.background
		}))
	}
	
	tick() {
		if (!this.entity) {
			return b3.FAILURE
		}
		// console.log(`%c ${this.message} `, this.style)
		return b3.SUCCESS
	}
}

Logger.prototype.name = 'Logger'
Logger.prototype.parameters = {
	message: '-silence-',
	textStyle: {fill: 0x000000},
	background: 0xffffff,
	entity: undefined,
}

export default Logger
