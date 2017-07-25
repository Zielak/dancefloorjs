import * as PIXI from 'pixi.js'
import Bubble from '../../components/bubble'

class Logger extends b3.Action {
	constructor(settings) {
		super({settings, name: 'Logger'})
		
		this.message = settings.message || '-silence-'
		this.textStyle = Object.assign({}, {fill: 0x000000}, settings.textStyle || {})
		this.background = settings.background || 0xffffff
		this.entity = settings.entity
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
		return b3.SUCCESS
	}
}

export default Logger
