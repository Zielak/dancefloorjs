import { Graphics, Text, Container } from 'pixi.js'
import { ui } from '../game'
import Timer from '../timer'
import Component from '../component'
// import Vector from '../vector'

const defaultTextStyle = { fontSize: 12 }
const paddingX = 2
const paddingY = 4

export default class Bubble extends Component {
	/**
	 * Creates an instance of Bubble.
	 * @param {string} message 
	 * @param {PIXI.TextStyle} textStyle 
	 * @param {PIXI.Rectangle} rectangle
	 * @param {string} [background]
	 * @memberof Bubble
	 */
	constructor({message = '-silence-', textStyle, rectangle, background = 0xffffff}) {
		super('bubble')

		this.timer = new Timer(Math.min(message.length, 10) * 150)

		this.container = new Container()

		this.bgRect = new Graphics()
		this.bgRect.beginFill(background, 0.9)
			.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
			.endFill()

		this.text = new Text(message, Object.assign({}, defaultTextStyle, textStyle || {}))

		this.updateSizes(this.bgRect, this.text)

		this.container.addChild(this.bgRect)
		this.container.addChild(this.text)
	}

	addedToEntity() {
		ui.addChild(this.container)
	}

	removedFromEntity() {
		ui.removeChild(this.container)
	}

	update(dt, entity) {
		this.updatePosition(this.bgRect, this.text, entity)
		this.checkLifeTime(entity)
	}

	updatePosition(bg, text, entity) {
		bg.x = entity.x
		bg.y = entity.y - entity.height - bg.height
		text.x = bg.x - bg.width / 2 + paddingX
		text.y = bg.y + paddingY
	}

	updateSizes(bg, text) {
		bg.width = text.width + paddingX*2
		bg.height = text.height + paddingY*2
	}

	checkLifeTime(entity) {
		if (this.timer.finished) {
			entity.removeComponent(this)
		}
	}
}